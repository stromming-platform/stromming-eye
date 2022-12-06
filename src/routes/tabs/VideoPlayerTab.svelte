<script lang="ts">
    import img from "$lib/images/strommingPog.png";
	import vid from "$lib/videos/video.mp4";

	import { Grid, gridHelp } from "$lib/js/svelte-grid";

    let items = [
    {
		6: gridHelp.item({
			x: 0,
			y: 0,
			w: 4,
			h: 5,
		}),
		//id: id(),
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
  const cols = [[1200, 6]];

	// TODO: export to type-file
	type boxItem = {
		6: any,
		id: string,
	}

	function toggleBoll() {
		boll = !boll;
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
	</div>

	<div id="container">
		{#if boll}
		<div class="demo-container">
			<Grid bind:items rowHeight={100} let:item let:dataItem {cols}>
			  <div class="demo-widget">{dataItem.id}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:pointerdown={e => e.stopPropagation()}
					on:click={() => remove(dataItem)}
					class=remove
					>
					x
				  </span>
				  <p>{dataItem.id}</p>
			</div>
			</Grid>
		</div>
		{/if}
		
		<video width="1080" height="1920" controls >
			<source src={vid} type="video/mp4">
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
		width: 240px;
		padding-bottom: 20px;
	}

	h1 {
		width: 100%;
	}

	.demo-container{
		width: 100%;
		height: 100%;
		/* border-radius: 10px;
		border-color: blue;
		border-width: 10px; */
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

	#container {
		width: 100%;
		max-width: 960px;
		max-height: 960px;
		position: relative;
	}
</style>