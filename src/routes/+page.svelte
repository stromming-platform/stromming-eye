<script lang="ts">
	const source = 'src/lib/videos/video.mp4'
	const poster = 'src/lib/images/strommingPog.png'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
			<p>HELLO</p> 
			<img height="50" width="100" src="src/lib/images/strommingPog.png" alt="TEST">
	</h1>

	<div id="container">
		<video width="500" height="340" controls >
			<source src="src/lib/videos/video.mp4" type="video/mp4">
		</video> 
	</div>
</section>

<style>
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

	#container {
		width: 100%;
		max-width: 960px;
	}
</style>
