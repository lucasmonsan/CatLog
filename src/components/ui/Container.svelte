<script lang="ts">
	import { fade } from 'svelte/transition'

	export let type: 'header' | '' = ''
</script>

{#if type === 'header'}
	<header transition:fade>
		<slot />
	</header>
{:else}
	<section transition:fade>
		<slot />
	</section>
{/if}

<style>
	header,
	section {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--gap-1);
		width: 100%;
		padding: calc(var(--base) * 0.75) calc(var(--base) * 1);
		background-color: var(--border-color);
		border-radius: var(--radius-2);
		border: none;
		box-shadow: var(--shadow-1);
	}

	header {
		height: calc(var(--base) * 4);
	}
</style>
