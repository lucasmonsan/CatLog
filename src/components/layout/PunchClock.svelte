<script lang="ts">
	import Input from '../ui/Input.svelte'
	import Dropdown from '../ui/Dropdown.svelte'
	import Upload from '../ui/Upload.svelte'
	import Container from '../ui/Container.svelte'
	import PunchClockIcon from '$lib/icons/PunchClockIcon.svelte'
	import Button from '../ui/Button.svelte'
	import { isValidTime, type PunchClockPoint, type PunchClockPointType } from '$lib/types/punchClock.d'

	export let points: PunchClockPoint[] = []
	export let maxPoints: number = 4
	export let onUpdate: (updatedPoints: PunchClockPoint[]) => void = () => {}

	const updatePoint = (index: number, key: keyof PunchClockPoint, value: string | Blob | undefined): void => {
		if (key === 'time' && typeof value === 'string' && !isValidTime(value)) {
			alert('Por favor, insira um horário válido no formato HH:mm.')
			return
		}
		points = points.map((p, i) => (i === index ? { ...p, [key]: value } : p))
		onUpdate([...points])
	}

	$: {
		while (points.length < maxPoints) {
			points.push({
				time: '',
				type: undefined,
				image: undefined
			})
		}

		if (points.length >= 1 && !points[0].type) points[0].type = 'start' as PunchClockPointType

		if (points.length >= maxPoints && !points[maxPoints - 1].type) points[maxPoints - 1].type = 'end' as PunchClockPointType

		// Lógica para intercalar os tipos "break" e "return" nos pontos intermediários
		points.forEach((point, index) => {
			if (index > 0 && index < maxPoints - 1 && !point.type) {
				point.type = (index % 2 === 0 ? 'return' : 'break') as PunchClockPointType // Forçar o tipo
			}
		})
	}

	const dropdownOptions = [
		{ value: 'start', label: 'Início' },
		{ value: 'break', label: 'Pausa' },
		{ value: 'return', label: 'Volta' },
		{ value: 'end', label: 'Fim' }
	]
</script>

<Container>
	<div>
		<Button classes="transparent icon">
			<PunchClockIcon />
		</Button>

		<Button classes="transparent">
			<h2>Registro de Ponto</h2>
		</Button>
	</div>

	<ul>
		{#each points as point, index}
			<li>
				<Input id="Timepicker{index}" type="time" align="center" value={point.time} onInput={(value: string | Blob | undefined) => updatePoint(index, 'time', value)} />
				<Dropdown value={point.type || ''} options={dropdownOptions} onChange={(value: string) => updatePoint(index, 'type', value as PunchClockPointType)} />
				<Upload id="Updater{index}" type="image" onFileSelect={(file: string | Blob | undefined) => updatePoint(index, 'image', file)} />
			</li>
		{/each}
	</ul>
</Container>

<style>
	div {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
		width: 100%;
		height: calc(var(--base) * 1.5);
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
</style>
