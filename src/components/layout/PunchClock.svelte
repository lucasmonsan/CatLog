<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
	import PointIcon from '$lib/icons/PointIcon.svelte'
	import { pickDay, pickMonth, pickYear, todayDay, todayMonth, todayYear } from '$lib/stores/calendar'
	import { onMount } from 'svelte'

	let visible = false
	let option = false

	onMount(() => {
		visible = true
	})
</script>

{#if visible}
	<section class="container column {option && 'open'}">
		<div>
			<button class="transparent icon">
				<PointIcon />
			</button>

			<button class="transparent nowrap" on:click={() => (option = !option)}>
				<h6>Registro de Ponto</h6>
			</button>

			<button class="transparent jc-end w-100" on:click={() => (option = !option)}>
				<ArrowIcon />
			</button>
		</div>

		{#if option}
			<h1>Lucas</h1>
		{/if}
	</section>
{/if}

<style>
	section {
		justify-content: flex-start;
		max-height: calc(var(--base) * 3.125);

		&.open {
			max-height: calc(var(--base) * 6);
		}
	}

	div {
		justify-content: flex-start;
		gap: var(--gap-1);
		width: 100%;
		height: calc(var(--base) * 1.5);
	}

	button.transparent {
		min-width: auto;
		height: 100%;
	}
</style>
