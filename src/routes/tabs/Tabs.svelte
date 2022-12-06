<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let items;
    export let activeTab;
</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li on:click={() => dispatch('tabChange', item)}>
                <span class:active={item === activeTab}>{item}</span>
            </li>
        {/each}
    </ul>
</div>

{#each items as item}
	{#if activeTab == item.value}
	<div class="box">
		<svelte:component this={item.component}/>
	</div>
	{/if}
{/each}

<style>

    li {
        margin: 0 16px;
        font-size: 18px;
        color: #555;
        cursor: pointer;
        padding-bottom: 5px;
    }
    .active {
        background-color: #B6798B;
        color: #000000;
        padding-bottom: 8px;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        padding: 0.5rem 1rem;
        border-top: 1px solid #dee2e6;
      	border-left: 1px solid #dee2e6;
      	border-right: 1px solid #dee2e6;
        position: relative;
        z-index: -1;
    }

    .box {
		margin-bottom: 10px;
		padding: 40px;
		border: 1px solid #dee2e6;
        border-radius: 0 0 .5rem .5rem;
        border-top: 0;
        background-color: #8c5d6b;
        padding-left: 1px;
        }
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }

    span:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
    }
</style>