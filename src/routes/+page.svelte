<script lang="ts">
	// NOTE: Might want to move assets outside of /src/ since that would build it differently
	// NOTE: Since these are static images we have to import them like this, since the svelte compiler apparently does not
	// allow for things like <img src="/bla/blorg/blirg.png">
	
	import Header from "./Header.svelte";
	import InfoTab from "./tabs/InfoTab.svelte";
	import VideoPlayerTab from "./tabs/VideoPlayerTab.svelte";
	import { fade } from 'svelte/transition';
	import Tabs from "./tabs/Tabs.svelte";

	const id = () => "_" + Math.random().toString(36).substr(2, 9);

	//tabs
	let tabItems = ["Info", "Video Player"];
	let activeTab = "Info";
	const tabChange = (e) => {
		activeTab = e.detail;
	}

	
</script>

<section>
	STRØMMING
</section>

<!--<svelte:head>
	<title></title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>-->
<Tabs {activeTab} items={tabItems} on:tabChange={tabChange}></Tabs>
{#if activeTab === "Info"}
	<InfoTab></InfoTab>
{:else if activeTab === "Video Player"}
	<VideoPlayerTab></VideoPlayerTab>
{/if}



<style>

	main {
		height: 100vh;
		min-width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: sans-serif;
		background-color: rgb(185, 141, 185);
	}

	section {
		font-size: 60px;
		text-align: center;
	}

	.remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }

	
</style>
