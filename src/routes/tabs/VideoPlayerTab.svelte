<script lang="ts">
	import vid_whole from "$lib/videos/broadcast.mp4";
	import vid_stitched from "$lib/videos/combined.mp4";
	import { onMount } from 'svelte';
	import type { exportItem, boxItem } from "$lib/types";
	import { Grid, gridHelp } from "$lib/js/svelte-grid";
	import ViewboxConfigModal from "../../components/ViewboxConfigModal.svelte";
	import Toast from "../../components/toaster/Toast.svelte";
	import { notifications } from "../../components/toaster/notification";
	import Fa from 'svelte-fa';
	import { faCog } from '@fortawesome/free-solid-svg-icons';

	const id = () => "_" + Math.random().toString(36).substr(2, 9);
	const COLS = 6;
	let modalActive = false;
	let currentGridBox: boxItem|undefined;

    let items = [
    {
		[COLS]: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,
		}),
		id: id(),
		source: 'myStream.com',
		isPrimaryAudioSource: true,
    },
    {
		[COLS]: gridHelp.item({
			x: 4,
			y: 0,
			w: 2,
			h: 2,
		}),
		id: id(),
		source: undefined,
		isPrimaryAudioSource: false,
    },
	{
		[COLS]: gridHelp.item({
			x: 4,
			y: 2,
			w: 2,
			h: 2,
		}),
		id: id(),
		source: undefined,
		isPrimaryAudioSource: false,
	},
  ];

  let boll = false;
  let loaded = false;
  let basic = null;
  let myVideo = null;
  let vidSrc = null;
  const cols = [[1200, 6]];

	onMount(async () => {
		basic = vid_whole
		vidSrc = vid_whole;
		loaded = true;
	});

	function toggleBoll() {
		boll = !boll;
	}

	/**
	 * Toggels the configuration modal for the layout boxes
	 * where one can edit video source and set a particular audiosource
	 * 
	 * @param currentBox 
	 */
	function toggleConfigModal(currentBox: boxItem|undefined) {
		if(currentBox){
			modalActive = !modalActive;
			currentGridBox = currentBox;
		}
		else{
			notifications.danger('Something went wrong with the Config', 5000)
		}
	}

	/*
	 * Sends the current layout to the backend to be processed 
	 */
	function toggleStitch() {
		const exportList: exportItem[] = [];
		let hasAudio = false;
		for(let i of items){
			let tempItem: exportItem = {
				source: i[6].source,
				height: i[6].h,
				width: i[6].w,
				xCoord: i[6].x,
				yCoord: i[6].y,
				audio: i.isPrimaryAudioSource, 
			}
			if(i.isPrimaryAudioSource) {hasAudio = true;}
			exportList.push(tempItem);
		}
		if(hasAudio){
			// TODO: gotta do API call
			// Play video
			if(vidSrc == basic){			
			vidSrc = vid_stitched;
			} 
			else {			
				vidSrc = vid_whole;
			}
			myVideo.load();

			// Toggle layout
			if(boll){
				toggleBoll();
			}
			myVideo.play();
		}
		else {
			notifications.info('You have no audio selected, please select one', 5000)
		}
		console.log(exportList);
	}

	function handlePrimaryAudioChange(){
		if(currentGridBox?.isPrimaryAudioSource){
			for(let i of items){
				if(i.id != currentGridBox.id){
					i.isPrimaryAudioSource = false;
				}
			}
		}
	}

	/**
	 * Removes a layout box
	 * @param item
	 */
	function remove(item: boxItem) {
  		items = items.filter((value) => value.id !== item.id);
	}

	/**
	 * Adds a layout box
	 */
	function add() {
		let newItem = {
			[COLS]: gridHelp.item({
			w: 2,
			h: 2,
			x: 0,
			y: 0,
			}),
			id: id(),
			source: undefined,
			isPrimaryAudioSource: false,
		};

		let findOutPosition = gridHelp.findSpace(newItem, items, 6);

		// I Really Fucking Hate This Syntax
		newItem = {
			...newItem,
			[6]: {
			...newItem[6],
			...findOutPosition,
			},
		};

		items = [...items, ...[newItem]];

	}
</script>

<section>

	<div class="button-container">
		<button on:click={toggleBoll} class="bg-[#9899D0] rounded p-2 text-white">
			Toggle overlay
		</button>
	
		<button on:click={add} class="bg-[#9899D0] rounded p-2 text-white">
			Add stream
		</button>

		<button on:click={toggleStitch} class="bg-[#9899D0] rounded p-2 text-white">
			Set layout
		</button>
	</div>

	<div id="container">
		{#if modalActive}
			<div class="options">
				<ViewboxConfigModal
					streamURL={currentGridBox.source}
					isPrimaryAudio={currentGridBox.isPrimaryAudioSource}
					on:save={(event) => {
						currentGridBox.source = event.detail.url;
						currentGridBox.isPrimaryAudioSource = event.detail.audio;
						handlePrimaryAudioChange();
					}}
					on:close={toggleConfigModal}
				/>
		 	</div>		
		{/if}
		{#if boll}
		<div class="demo-container">
			<Grid bind:items rowHeight={100} let:item let:dataItem {cols}>
			  <div class="demo-widget">{dataItem.id}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:pointerdown={e => e.stopPropagation()}
					on:click={() => remove(dataItem)}
					class="remove"
					>
					x
				  </span>
				  <p class="left-3">{dataItem.id}</p>		
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:pointerdown={e => e.stopPropagation()}
					on:click={toggleConfigModal(dataItem)}
					class="bottom-1 left-3 absolute"
				>
				<p class="cog"> <Fa icon={faCog} style="padding: 0 0 10 5;" size="1.8x"/></p>
			</span>
			</div>
			</Grid>
		</div>
		{/if}
		
		<video width="3446" height="1964" controls bind:this={myVideo}>
			<source src={vidSrc} type="video/mp4">
			<track kind="captions"/>
		</video> 
</section>

<style>
    section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.5;
		background-color: #B6798B;
      	padding:5%;
		border-bottom: 1px solid #dee2e6;
      	border-left: 1px solid #dee2e6;
      	border-right: 1px solid #dee2e6;
		border-top: 1px solid #dee2e6;
	}

	.button-container {
		display: flex;
		align-items: right;
		justify-content: space-between;
		width: 25rem;
		padding-bottom: 1rem;
	}

	.demo-container{
		z-index: 99;
		width: 100%;
		height: 100%;
		position: absolute;
	}

	:global(.svlt-grid-shadow) {
		/* Back shadow */
		background: rgb(254, 224, 255);
	}
	:global(.svlt-grid-container) {
		/* Container color */
		max-width: 100%;
		max-height: 100%;
		min-width: 100%;
		min-height: 100%;
		height: 100%;
		width: 100%;
		background: rgb(126, 112, 128);
		opacity: 75%;
		
	}
	:global(.svlt-grid-resizer::after) {
		/* Resizer color */
		max-width: 100%;
		max-height: 100%;
		border-color: white !important;
	}

	:global(.svlt-grid-item) {
		background: rgb(175, 138, 199);
		border-radius: 6px;
		border: 2px solid black;
	}

	.remove { 
		cursor: pointer; 
		position: absolute; 
		right: 10px; 
		top: 3px; 
	}

	#container {
		width: 100%;
		max-width: 960px;
		max-height: 960px;
		position: relative;
	}
	.demo-widget {
		padding: 3%;
		opacity: 100%;
	}
	.cog {
		cursor: pointer;
	}
	.options {
		background: rgb(126, 112, 128);
	}
</style>
