<script lang="ts">
	import vid_whole from "$lib/videos/broadcast.mp4";
	import vid_stitched from "$lib/videos/combined.mp4";
	import { onMount } from 'svelte';
	
	import { Grid, gridHelp } from "$lib/js/svelte-grid";

	const id = () => "_" + Math.random().toString(36).substr(2, 9);

    let items = [
    {
		6: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 4,
		}),
		id: "Box1",
    },
    {
		6: gridHelp.item({
			x: 4,
			y: 0,
			w: 2,
			h: 2,
		}),
		id: "Box2",
    },
	{
		6: gridHelp.item({
			x: 4,
			y: 2,
			w: 2,
			h: 2,
		}),
		// This makes a random ID
		//id: id(),
		id: "Box3"
	},
  ];

  let boll = false;
  let loaded = false;
  let basic = null;
  let myVideo = null;
  let vidSrc = null;
  const cols = [[1200, 6]];
  

	// TODO: export to type-file
	type boxItem = {
		6: any,
		id: string,
	}

	onMount(async () => {
		basic = vid_whole
		vidSrc = vid_whole;
		loaded = true;
	});

	function toggleBoll() {
		boll = !boll;
	}

	function toggleStitch() {
		if(vidSrc == basic){
			console.log("this");
			
			vidSrc = vid_stitched;
		}
		else {
			console.log("that");
			
			vidSrc = vid_whole;
		}
		myVideo.load();

		if(boll){
			toggleBoll();
		}
		myVideo.play()
	}

	function remove(item: boxItem) {
  		items = items.filter((value) => value.id !== item.id);
	}

	function add() {
		let newItem = {
			6: gridHelp.item({
			w: 2,
			h: 2,
			x: 0,
			y: 0,
			}),
			id: id(),
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
				  <p>{dataItem.id}</p>
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
		background: rgb(229, 203, 231);
		opacity: 45%;
	}
	:global(.svlt-grid-resizer::after) {
		/* Resizer color */
		max-width: 100%;
		max-height: 100%;
		border-color: white !important;
	}

	:global(.svlt-grid-item) {
		background: red;
	}

	.remove { 
		cursor: pointer; 
		position: absolute; 
		right: 5px; 
		top: 3px; 
	}

	#container {
		width: 100%;
		max-width: 960px;
		max-height: 960px;
		position: relative;
	}
</style>
