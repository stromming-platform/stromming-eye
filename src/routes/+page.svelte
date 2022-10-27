<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import {
		Player,
		Video, 
		DefaultUi,
		usePlayerStore,
	} from '@vime/svelte';

	const source: string = 'src/lib/videos/video.mp4'
	const poster: string = 'src/lib/images/strommingPog.png'

	// Custom UI component.
	import TapSidesToSeek from './TapSidesToSeek.svelte';

	// Obtain a ref if you need to call any methods.
	//let player: Player;

	/**
	 * All player properties are available through the store. If you prefer, you could also pass 
	 * properties directly to the player and listen for events.
	 */
	//const { paused } = usePlayerStore(() => player);

	const onPlaybackReady = () => {
		// ...
	};

	//$: console.log($paused);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<div id="container">
		<Player controls>
			<Video crossOrigin="" poster={poster}>
				<source data-src={source} type="video/mp4">
			</Video>
	
			<DefaultUi noClickToPlay>
			</DefaultUi>
		</Player>
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

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	#container {
		width: 100%;
		max-width: 960px;
	}
</style>
