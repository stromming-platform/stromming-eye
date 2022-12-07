<script lang="ts">
	// NOTE: Might want to move assets outside of /src/ since that would build it differently
	// NOTE: Since these are static images we have to import them like this, since the svelte compiler apparently does not
	// allow for things like <img src="/bla/blorg/blirg.png">
	
	import InfoTab from "./tabs/InfoTab.svelte";
	import VideoPlayerTab from "./tabs/VideoPlayerTab.svelte";
	import Tabs from "./tabs/Tabs.svelte";

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

<Tabs {activeTab} items={tabItems} on:tabChange={tabChange}></Tabs>
{#if activeTab === "Info"}
	<InfoTab></InfoTab>
{:else if activeTab === "Video Player"}
	<VideoPlayerTab></VideoPlayerTab>
{/if}



<style>

	section {
		font-size: 60px;
		text-align: center;
	}

	
</style>
