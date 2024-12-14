<script lang="ts">
	import Input from '../ui/Input.svelte'
	import Dropdown from '../ui/Dropdown.svelte'
	import Upload from '../ui/Upload.svelte'
	import type { PunchClockPoint, PunchClockPointType } from '$lib/types/punchClock'
	import Container from '../ui/Container.svelte'

	export let points: PunchClockPoint[] = []
	export let maxPoints: number = 4
	export let onUpdate: (updatedPoints: PunchClockPoint[]) => void = () => {}

	const updatePoint = (index: number, key: keyof PunchClockPoint, value: string | Blob | undefined): void => {
		points[index] = { ...points[index], [key]: value }
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
	}

	const dropdownOptions = [
		{ value: 'start', label: 'Início' },
		{ value: 'break', label: 'Intervalo' },
		{ value: 'return', label: 'Retorno' },
		{ value: 'end', label: 'Fim' }
	]
</script>

<Container>
	<ul>
		{#each points as point, index}
			<li>
				<Input id="Timepicker{index}" type="time" align="center" value={point.time} onInput={(value: string | Blob | undefined) => updatePoint(index, 'time', value)} />
				<Dropdown value={point.type || ''} options={dropdownOptions} onChange={(value: string) => updatePoint(index, 'type', value as PunchClockPointType)} />
				<Upload id="Updater{index}" onFileSelect={(file: string | Blob | undefined) => updatePoint(index, 'image', file)} />
				<button on:click={() => console.log(point.time, '-', point.type)}>Printar</button>
			</li>
		{/each}
	</ul>
</Container>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap-2);
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}
</style>
