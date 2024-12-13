<script lang="ts">
	export let value: string = ''
	export let options: { value: string; label: string }[] = []
	export let onChange: (value: string) => void = () => {}

	const handleChange = (e: Event): void => {
		const target = e.target as HTMLSelectElement | null
		if (target) onChange(target.value)
	}
</script>

<select bind:value on:change={handleChange} class="type-select">
	<option value="" disabled>Selecione</option>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	select {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: calc(var(--base) * 0.25);
		width: 100%;
		padding: calc(var(--base) * 0.25) 0;
		opacity: 0.5;
		color: var(--text-color);
		background-color: transparent;
		border: none;
		transition:
			border var(--fast),
			opacity var(--fast);
	}
</style>
