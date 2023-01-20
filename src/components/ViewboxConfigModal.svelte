<!-- <script context="module" lang="ts">

 	let modal = {};

	export function getModal(){
		return modal;
	}

</script> -->

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	// import { onDestroy } from "svelte";

	export let streamURL: string|undefined;
	export let isPrimaryAudio: boolean;
	let componentRef: HTMLDivElement;
	const dispatch = createEventDispatcher();
	console.log(isPrimaryAudio);

	// function keyPressed(event: any) {
	// 	if (event.key == 'Escape'){
	// 		close();
	//         }
	// }

	// function open(callback: any){
	// 	closeCallback = callback;
	// 	window.addEventListener('keydown', keyPressed);
	// 	document.body.style.overflow = 'hidden';
	// 	visible = true;
	// 	document.body.appendChild(componentRef);
	// }

	// function close(returnValue: any){
	// 	if (!visible) return;
	// 	window.removeEventListener('keydown', keyPressed);
	// 	visible = false;
	// 	if(closeCallback) closeCallback(returnValue);
	// }

	// modal = {open, close}

	// onDestroy(() => {
	// 	delete ;
	// 	window.removeEventListener('keydown', keyPressed);
	// });

</script>

<div
	bind:this={componentRef}	 
	class="modalContainer border border-2 rounded"
>
	<div class="p-2 w-full h-full">
		<div>
			<label for="">Source:</label>
			<input type="url" bind:value={streamURL} class="border border-2">
		</div>
		<div>
			<label for="">Audio source:</label>
			<input type="checkbox" bind:checked={isPrimaryAudio}>
		</div>
		<div class="bottom-0 left-0 absolute w-full my-1">	
		        <div class="flex mx-1">
			<button
				class="flex-none bg-green-300 hover:bg-green-500 rounded p-1"
				on:click={() => {
					dispatch('save', {url: streamURL, audio: isPrimaryAudio});
					componentRef.parentNode?.removeChild(componentRef);
					dispatch('close');
					}}
				>
				Save
			</button>
			<span class="grow"></span>
			<button
				class="felx-none bg-red-300 hover:bg-red-500 rounded p1"
				on:click={() =>{
					componentRef.parentNode?.removeChild(componentRef);
					dispatch('close');
				}
				}
				>
				Close
			</button>
			</div>
		</div>	
	</div>
</div>

<style>

	.modalContainer{

		width: 100x;
		height: 200px;
		z-index: 99;
		position: absolute;
		background-color: white;
	}


</style>
