<script lang="ts">
	export let classes: string = ''
</script>

<button class={classes} on:click>
	<slot />
</button>

<style>
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		height: 100%;
		padding: calc(var(--base) * 0.5);
		line-height: calc(var(--base) * 0.8);
		color: var(--text-color);
		font-weight: 600;
		font-family: var(--family-1);
		background-color: var(--bg-color);
		opacity: 0.5;
		border: solid 1px var(--bg-color);
		border-radius: var(--radius-1);
	}

	.column {
		flex-direction: column;
	}
	.end {
		justify-content: flex-end;
		border: solid 1px red;
	}
	.w-100 {
		width: 100%;
	}
	.icon {
		min-width: calc(var(--base) * 1.5);
		max-width: calc(var(--base) * 1.5);
	}
	.transparent {
		padding: 0;
		background-color: transparent;
		opacity: 1;
		border-color: transparent;
	}
	.today {
		color: var(--bg-color) !important;
		background-color: var(--text-color) !important;
		opacity: 1;
		border: solid 1px var(--text-color);
	}
	.selected {
		width: auto;
		color: var(--text-color);
		opacity: 1;
		border: solid 1px var(--text-color);
	}
</style>
