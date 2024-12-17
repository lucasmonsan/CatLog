<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte'
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte'
	import Container from '../ui/Container.svelte'
	import { pickDay, pickMonth, setDate, toDay, pickYear, toMonth, toYear } from '$lib/stores/calendarStore'
	import { tick } from 'svelte'

	const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
	const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

	let showContent = false

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

	async function toggleShowContent() {
		showContent = !showContent
		await tick()
		if (showContent) {
			scrollToItem(daysListDiv, $pickDay - 1)
			scrollToItem(monthsListDiv, $pickMonth - 1)
			scrollToItem(yearsListDiv, $pickYear - 2000)
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

	function resetToToday() {
		setDate(toYear, toMonth, toDay)
	}
</script>

<Container>
	<div>
		{#if $pickDay === toDay}
			<button class="transparent icon" on:click={() => toggleShowContent()}>
				<CalendarIcon />
			</button>
		{:else}
			<button class="transparent icon" on:click={() => resetToToday()}>
				<RefreshIcon />
			</button>
		{/if}

		<button class="transparent w-100" on:click={() => toggleShowContent()}>
			<h2>{String($pickDay).padStart(2, '0')}</h2>
			-
			<h2>{monthNames[$pickMonth - 1]}</h2>
			-
			<h2>{$pickYear}</h2>
		</button>

		<button class="transparent w-100 end" on:click={() => toggleShowContent()}>
			<ArrowIcon />
		</button>
	</div>

	{#if showContent}
		<ul bind:this={daysListDiv}>
			{#each getDaysInMonth($pickMonth, $pickYear) as dayNumber}
				<li>
					<button class="{getButtonClass('day', dayNumber)} column" on:click={() => setDate($pickYear, $pickMonth, ($pickDay = dayNumber))}>
						<h6>{getWeekday(dayNumber, $pickMonth, $pickYear)}</h6>
						<h4>{dayNumber}</h4>
					</button>
				</li>
			{/each}
		</ul>

		<ul bind:this={monthsListDiv}>
			{#each monthNames as monthName, i}
				<li>
					<button class={getButtonClass('month', i + 1)} on:click={() => setDate($pickYear, ($pickMonth = i + 1), $pickDay)}>
						<h4>{monthName}</h4>
					</button>
				</li>
			{/each}
		</ul>

		<ul bind:this={yearsListDiv}>
			{#each yearRange as year}
				<li>
					<button class={getButtonClass('year', year)} on:click={() => setDate(($pickYear = year), $pickMonth, $pickDay)}>
						<h4>{year}</h4>
					</button>
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
		width: 100%;
		padding: var(--gap-2) var(--gap-1);
	}

	li {
		display: inline-block;
		scroll-snap-align: center;
	}
</style>
