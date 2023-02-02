<script type="ts">
	import type { theme } from "$lib/types";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "./notification";

    export let themes: theme[] = [{
        danger: "#E26D69",
        success: "#84C991",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa",
    }];
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast"
            style="background: {themes[notification.type]};"
            transition:fly={{ y: 30 }}
        >
            <div class="content">{notification.message}</div>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: absolute;
        bottom: 0;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }

    .toast {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        width: 25%;
        flex: 0 0 auto;
        background: #ffff;
        opacity: 60%;
        border-radius: 1rem;
        /* margin-bottom: 10px; */
    }

    .content {
        padding: 10px;
        display: block;
        color: black;
        font-weight: 500;
    }
</style>
