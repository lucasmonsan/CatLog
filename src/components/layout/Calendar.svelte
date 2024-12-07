<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte'
	import { pickDay, pickMonth, pickYear } from '$lib/stores/calendar'
	import { onMount } from 'svelte'

	let visible = false
	let option: 'days' | 'months' | 'years' | '' = ''
	const days = [...Array(new Date($pickYear, $pickMonth, 1).getDay()).fill(null), ...Array.from({ length: new Date($pickYear, $pickMonth + 1, 0).getDate() }, (_, i) => i + 1)]
	const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
	const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
	const years = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i)

	const handleToggle = (next: 'days' | 'months' | 'years' | '') => {
		if (option === next) option = ''
		else option = next
	}

	onMount(() => {
		visible = true
	})
</script>

{#if visible}
	<section class="container column {option}">
		<div>
			<button class="transparent icon" on:click={() => handleToggle('days')}>
				<CalendarIcon />
			</button>

			<button class="transparent" on:click={() => handleToggle('days')}>
				<h6>{String($pickDay).padStart(2, '0')}</h6>
			</button>

			<h6>-</h6>

			<button class="transparent" on:click={() => handleToggle('months')}>
				<h6>{monthNames[$pickMonth]}</h6>
			</button>

			<h6>-</h6>

			<button class="transparent" on:click={() => handleToggle('years')}>
				<h6>{$pickYear}</h6>
			</button>

			<button class="transparent jc-end w-100" on:click={() => (option = option === '' ? 'days' : '')}>
				<ArrowIcon />
			</button>
		</div>

		{#if option === 'days'}
			<ul class="day">
				{#each dayNames as dayName}
					<li>{dayName}</li>
				{/each}
			</ul>

			<ul class="day">
				{#each days as day}
					<li>{day}</li>
				{/each}
			</ul>
		{:else if option === 'months'}
			<ul class="months">
				{#each monthNames as month}
					<li>{month}</li>
				{/each}
			</ul>
		{:else if option === 'years'}
			<ul class="years">
				{#each years as year}
					<li>{year}</li>
				{/each}
			</ul>
		{/if}
	</section>
{/if}

<style>
	section {
		justify-content: flex-start;
		max-height: calc(var(--base) * 3.125);

		&.days {
			max-height: calc(var(--base) * 16.5);
		}
		&.months,
		&.years {
			max-height: calc(var(--base) * 12);
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

	ul.day {
		grid-template-columns: repeat(7, 1fr);
	}

	ul.months {
		grid-template-columns: repeat(3, 1fr);

		li {
		}
	}

	ul.years {
		grid-template-columns: repeat(4, 1fr);
	}
</style>
