<script lang="ts">
	export let type: 'header' | '' = '';
</script>

{#if type === 'header'}
	<header>
		<slot />
	</header>
{:else}
	<section>
		<slot />
	</section>
{/if}

<style>
	header,
	section {
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--gap-2);
		width: 100%;
		padding: calc(var(--base) * 0.75) calc(var(--base) * 1);
		background-color: var(--border-color);
		border-radius: var(--radius-2);
		border: none;
		box-shadow: var(--shadow-1);
	}

	section {
		flex-direction: column;
	}
</style>
