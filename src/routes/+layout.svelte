<script lang="ts">
	// import '../styles/variables.css'
	// import '../styles/reset.css'
	// import '../styles/animations.css'
	import { fade } from 'svelte/transition'
	import { cubicInOut } from 'svelte/easing'

	export let data: { url: string }
</script>

{#key data.url}
	<main in:fade={{ duration: 400, delay: 500, easing: cubicInOut }} out:fade={{ duration: 400, easing: cubicInOut }}>
		<slot />
	</main>
{/key}

<style>
	main {
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
		padding: var(--padd);
		padding-left: calc(var(--w-nav) + calc(var(--base) * 5));
	}
</style>
