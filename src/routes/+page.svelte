<script lang="ts">
	// NOTE: Might want to move assets outside of /src/ since that would build it differently
	// NOTE: Since these are static images we have to import them like this, since the svelte compiler apparently does not
	// allow for things like <img src="/bla/blorg/blirg.png">
	import img from "$lib/images/strommingPog.png"
	import vid from "$lib/videos/video.mp4"

	import { Grid, gridHelp } from "$lib/js/svelte-grid";

	const id = () => "_" + Math.random().toString(36).substr(2, 9);

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

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		HELLO 
		<img height="50" width="100" src={img} alt="TEST">
	</h1>
	
	<button on:click={toggleBoll} class="bg-green-500 rounded p-2 text-white">
		clickme
	</button>

	<button on:click={add} class="bg-blue-500 rounded p-2 text-white">
		add
	</button>

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

	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
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
		background: pink;
	}
	:global(.svlt-grid-container) {
		/* Container color */
		max-width: 100%;
		max-height: 100%;
		min-width: 100%;
		min-height: 100%;
		height: 100%;
		width: 100%;
		background: rgb(214, 215, 231);
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
