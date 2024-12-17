<script lang="ts">
	import Input from '../ui/Input.svelte'
	import Dropdown from '../ui/Dropdown.svelte'
	import Upload from '../ui/Upload.svelte'
	import Container from '../ui/Container.svelte'
	import PunchClockIcon from '$lib/icons/PunchClockIcon.svelte'
	import { isValidTime, type PunchClockPoint, type PunchClockPointType } from '$lib/types/punchClock.d'
	import { onMount } from 'svelte'
	import { pickDay, pickMonth, pickYear } from '$lib/stores/calendarStore'
	import { getPunchClock, savePunchClock } from '$lib/db/indexedDB'
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'

	let visible = false
	let showContent = false

	let refreshTrigger = 0

	// Dados do registro de ponto
	let points: PunchClockPoint[] = []
	let maxPoints: number = 8

	// Atualiza o registro de ponto
	const updatePoint = (index: number, key: keyof PunchClockPoint, value: string | Blob | undefined): void => {
		if (key === 'time' && typeof value === 'string' && !isValidTime(value)) {
			alert('Por favor, insira um horário válido no formato HH:mm.')
			return
		}
		points = points.map((p, i) => (i === index ? { ...p, [key]: value } : p))
	}

	const dropdownOptions = [
		{ value: 'start', label: 'Início' },
		{ value: 'break', label: 'Pausa' },
		{ value: 'return', label: 'Volta' },
		{ value: 'end', label: 'Fim' }
	]

	// Carrega o registro de ponto com base na data atual
	async function loadPunchClock() {
		try {
			const existingRecord = await getPunchClock($pickYear, $pickMonth, $pickDay)
			points = existingRecord?.points || [] // Carrega pontos ou inicia vazio
		} catch (error) {
			console.error('Erro ao carregar registro de ponto:', error)
		}

		while (points.length < maxPoints) {
			points.push({ time: '', type: undefined, image: undefined })
		}
	}

	// Salva o registro de ponto no IndexedDB
	async function savePunchClockData() {
		if (!$pickDay || !$pickMonth || !$pickYear) return alert('Data inválida. Verifique se o dia, mês e ano foram selecionados.')
		if (points.some((p) => !p.time || !p.type)) return alert('Todos os pontos devem ter horário e tipo preenchidos.')

		try {
			await savePunchClock({ year: $pickYear, month: $pickMonth, day: $pickDay, points })
			alert('Registro salvo com sucesso!')
		} catch (error) {
			console.error('Erro ao salvar registro de ponto:', error)
			alert('Erro ao salvar registro. Verifique o console para mais detalhes.')
		}
	}

	$: {
		if (points.length > 0) {
			if (!points[0].type) points[0].type = 'start' as PunchClockPointType // Primeiro item é sempre "Início"
			if (points.length >= maxPoints && !points[maxPoints - 1].type) points[maxPoints - 1].type = 'end' as PunchClockPointType // Último item é sempre "Fim"
			points.forEach((point, index) => {
				if (index > 0 && index < maxPoints - 1 && !point.type) point.type = (index % 2 === 0 ? 'return' : 'break') as PunchClockPointType // Itens intermediários alternam entre "Pausa" e "Volta"
			})
		}

		if (refreshTrigger !== $pickDay + $pickMonth + $pickYear) {
			loadPunchClock()
			refreshTrigger = $pickDay + $pickMonth + $pickYear
		}
	}

	onMount(() => (visible = true)) // Carrega os dados ao montar o componente ou mudar a data
</script>

{#if visible}
	<Container>
		<button class="transparent w-100" on:click={() => (showContent = !showContent)}>
			<PunchClockIcon />
			<h2>Registro de Ponto</h2>
			<ArrowIcon />
		</button>

		{#if showContent}
			<ul>
				{#each points as point, index}
					<li>
						<Input id="Timepicker{index}" type="time" align="center" value={point.time} onInput={(value: string | Blob | undefined) => updatePoint(index, 'time', value)} />
						<Dropdown value={point.type || ''} options={dropdownOptions} onChange={(value: string) => updatePoint(index, 'type', value as PunchClockPointType)} />
						<Upload id="Updater{index}" type="image" onFileSelect={(file: string | Blob | undefined) => updatePoint(index, 'image', file)} />
					</li>
				{/each}
			</ul>
			<button class="w-100" on:click={savePunchClockData}>
				<h3>Salvar</h3>
			</button>
		{/if}
	</Container>
{/if}

<style>
	button:has(h2) {
		height: calc(var(--base) * 1.5);
	}

	h2 {
		text-align: start;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap-2);
		width: 100%;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
		align-items: center;
	}

	button:has(h3) {
		margin-top: calc(var(--base) * 0.5);
	}
</style>
