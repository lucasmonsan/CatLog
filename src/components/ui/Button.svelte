<script lang="ts">
	export let color: 'transparent' | 'today' | 'selected' | '' = ''
</script>

<button class={color} on:click>
	<slot />
</button>

<style>
	button {
		cursor: pointer;
		display: inline-block;
		padding: calc(var(--base) * 0.25) calc(var(--base) * 0.5);
		line-height: calc(var(--base) * 0.8);
		color: var(--text-color);
		background-color: var(--bg-color);
		opacity: 0.5;
		border: solid 1px var(--bg-color);
		border-radius: var(--radius-1);

		&.transparent {
			padding: calc(var(--base) * 0.25) 0;
			background-color: transparent;
			opacity: 1;
			border: none;
		}
		&.today {
			color: var(--bg-color) !important;
			background-color: var(--text-color) !important;
			opacity: 1;
		}
		&.selected {
			color: var(--text-color);
			opacity: 1;
			border: solid 1px var(--text-color);
		}
	}
</style>
