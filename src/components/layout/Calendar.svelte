<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte'
	import { pickDay, pickMonth, setDate, toDay, pickYear, toMonth, toYear } from '$lib/stores/calendarStore'
	import Button from '../ui/Button.svelte'
	import Container from '../ui/Container.svelte'
	import { tick } from 'svelte'

	const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
	const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

	let showDayList = false
	let showMonthList = false
	let showYearList = false

	let daysListDiv: HTMLUListElement | null = null
	let monthsListDiv: HTMLUListElement | null = null
	let yearsListDiv: HTMLUListElement | null = null

	const currentYear = new Date().getFullYear() // Obtém o ano atual dinamicamente

	const yearRange = Array.from({ length: currentYear - 1999 }, (_, i) => i + 2000) // Gera a lista de anos de 2000 até o ano atual

	function getWeekday(day: number, month: number, year: number): string {
		return weekdays[new Date(year, month - 1, day).getDay()]
	}

	function getDaysInMonth(m: number, y: number): number[] {
		const daysInMonth = new Date(y, m, 0).getDate()
		return Array.from({ length: daysInMonth }, (_, i) => i + 1)
	}

	function getButtonClass(type: 'day' | 'month' | 'year', value: number): '' | 'today' | 'selected' {
		if (type === 'day') {
			if (toDay === value) return 'today'
			if ($pickDay === value) return 'selected'
		}
		if (type === 'month') {
			if (toMonth === value) return 'today'
			if ($pickMonth === value) return 'selected'
		}
		if (type === 'year') {
			if (toYear === value) return 'today'
			if ($pickYear === value) return 'selected'
		}
		return ''
	}

	async function toggleDayList(dayNumber: number) {
		showDayList = !showDayList
		setDate($pickYear, $pickMonth, ($pickDay = dayNumber))
		if (showDayList) {
			await tick()
			scrollToItem(daysListDiv, dayNumber - 1)
		}
	}

	async function toggleMonthList(monthNumber: number) {
		showMonthList = !showMonthList
		setDate($pickYear, ($pickMonth = monthNumber), $pickDay)
		if (showMonthList) {
			await tick()
			scrollToItem(monthsListDiv, monthNumber - 1)
		}
	}

	async function toggleYearList(yearNumber: number) {
		showYearList = !showYearList
		setDate(($pickYear = yearNumber), $pickMonth, $pickDay)
		if (showYearList) {
			await tick()
			scrollToItem(yearsListDiv, yearNumber - 2000) // Ajusta o índice para o ano
		}
	}

	function scrollToItem(container: HTMLUListElement | null, index: number) {
		if (container) {
			const buttons = container.querySelectorAll('button')
			const itemButton = buttons[index] as HTMLButtonElement
			if (itemButton) {
				itemButton.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center'
				})
			}
		}
	}
</script>

<Container>
	<div>
		<Button color="transparent">
			<CalendarIcon />
		</Button>

		<Button color="transparent" on:click={() => toggleDayList($pickDay)}>
			<h2>{String($pickDay).padStart(2, '0')}</h2>
		</Button>
		-
		<Button color="transparent" on:click={() => toggleMonthList($pickMonth)}>
			<h2>{monthNames[$pickMonth - 1]}</h2>
		</Button>
		-
		<Button color="transparent" on:click={() => toggleYearList($pickYear)}>
			<h2>{$pickYear}</h2>
		</Button>

		<Button color="transparent">
			<ArrowIcon />
		</Button>
	</div>

	{#if showDayList}
		<ul bind:this={daysListDiv}>
			{#each getDaysInMonth($pickMonth, $pickYear) as dayNumber}
				<li>
					<Button color={getButtonClass('day', dayNumber)} on:click={() => toggleDayList(dayNumber)}>
						<h6>{getWeekday(dayNumber, $pickMonth, $pickYear)}</h6>
						<h4>{dayNumber}</h4>
					</Button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if showMonthList}
		<ul bind:this={monthsListDiv}>
			{#each monthNames as monthName, i}
				<li>
					<Button color={getButtonClass('month', i + 1)} on:click={() => toggleMonthList(i + 1)}>
						<h4>{monthName}</h4>
					</Button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if showYearList}
		<ul bind:this={yearsListDiv}>
			{#each yearRange as year}
				<li>
					<Button color={getButtonClass('year', year)} on:click={() => toggleYearList(year)}>
						<h4>{year}</h4>
					</Button>
				</li>
			{/each}
		</ul>
	{/if}
</Container>

<style>
	div {
		display: flex;
		align-items: center;
		gap: var(--gap-1);
		width: 100%;
		height: calc(var(--base) * 1.5);
		font-family: var(--family-1);
		font-weight: bold;
	}

	ul {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		gap: var(--gap-1);
		padding: var(--gap-2) 0;
		width: 100%;
	}

	li {
		display: inline-block;
		scroll-snap-align: center;
	}
</style>
