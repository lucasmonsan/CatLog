<script lang="ts">
	import UploadIcon from '$lib/icons/UploadIcon.svelte'
	import UploadImageIcon from '$lib/icons/UploadImageIcon.svelte'

	export let id: string
	export let type: 'image' | '' = ''
	export let onFileSelect: (file: Blob | undefined) => void = () => {}

	const handleChange = (e: Event): void => {
		const target = e.target as HTMLInputElement | null
		if (target && target.files) onFileSelect(target.files[0])
	}
</script>

<label for={id}>
	{#if type === 'image'}
		<UploadImageIcon />
	{:else}
		<UploadIcon />
	{/if}
	<input type="file" accept="image/*" on:change={handleChange} />
</label>

<style>
	label {
		position: relative;
		cursor: pointer;
		display: flex;
		justify-content: center;
		width: 100%;
		height: calc(var(--base) * 2);
		opacity: 0.5;
		font-weight: 600;
		font-family: var(--family-1);
		border-radius: var(--radius-1);
		transition: opacity var(--fast);
	}

	input {
		all: unset;
		position: absolute;
		top: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
	}
</style>
