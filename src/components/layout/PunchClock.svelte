<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
	import PointIcon from '$lib/icons/PointIcon.svelte'
	import Input from '../ui/Input.svelte'
	import { onMount } from 'svelte'
	import { loadPunchClock, savePunchClock } from '$lib/db/indexedDB'
	import { pickDay, pickMonth, pickYear } from '$lib/stores/calendar'

	let visible = false
	let option = true
	let points: string[] = ['', '', '', '']
	let isSaving = false
	let loadDataTrigger = $pickDay + $pickMonth + $pickYear

	async function loadPoints() {
		try {
			points = await loadPunchClock($pickYear, $pickMonth, $pickDay)
		} catch (error) {
			console.error('Erro ao carregar os pontos:', error)
		}
	}

	const validatePoints = () => {
		return points
			.filter((time) => time !== '') // Filtra os horários preenchidos
			.every((time) => /\d{2}:\d{2}/.test(time)) // Verifica se o formato é "HH:mm"
	}

	const savePoints = async () => {
		console.log('Salvando pontos...')
		try {
			isSaving = true
			await savePunchClock($pickYear, $pickMonth, $pickDay, points)
		} catch (error) {
			console.error('Erro ao salvar os pontos:', error)
		} finally {
			isSaving = false
		}
	}

	onMount(async () => {
		visible = true
		points = await loadPunchClock($pickYear, $pickMonth, $pickDay)
	})

	$: {
		if (loadDataTrigger !== $pickDay + $pickMonth + $pickYear) {
			loadDataTrigger = $pickDay + $pickMonth + $pickYear
			loadPoints()
		}
	}
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
			<ul>
				{#each points as point, index}
					<li>
						<Input id={`point-${index}`} type="time" bind:value={point} placeholder="" align="center" />
					</li>
				{/each}
			</ul>

			<button class="w-100" disabled={isSaving} on:click={() => validatePoints() && savePoints()}>
				<strong>Salvar</strong>
			</button>
		{/if}
	</section>
{/if}

<style>
	section {
		justify-content: flex-start;
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

	ul {
		grid-template-columns: repeat(4, 1fr);
	}
</style>
