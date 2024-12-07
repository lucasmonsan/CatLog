<script lang="ts">
	import EmailIcon from '$lib/icons/EmailIcon.svelte'
	import PasswordIcon from '$lib/icons/PasswordIcon.svelte'
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte'

	export let id: string
	export let type: 'text' | 'email' | 'number' | 'password' | 'profile' = 'text'
	export let value: string = ''
	export let placeholder: string
</script>

<label for={id} class={value !== '' ? 'using' : ''}>
	<div>
		{#if type === 'email'}
			<EmailIcon />
		{:else if type === 'password'}
			<PasswordIcon />
		{:else if type === 'profile'}
			<ProfileIcon />
		{/if}
	</div>
	<input type={type === 'profile' ? 'text' : type} {id} {placeholder} bind:value />
</label>

<style>
	label {
		cursor: pointer;
		display: flex;
		gap: calc(var(--base) * 0.25);
		width: 100%;
		padding: calc(var(--base) * 0.25) 0;
		opacity: 0.5;
		border-bottom: solid 1px var(--text-color);
		transition:
			border var(--fast),
			opacity var(--fast);

		&.using {
			opacity: 1;
		}
	}

	div {
		width: calc(var(--base) * 1.25);
	}

	input {
		overflow: visible;
		outline: none;
		padding: calc(var(--base) * 0.125) 0 0 0;
		font-size: calc(var(--base) * 1);
		color: var(--text-color);
		background-color: transparent;
		border: none;
	}
</style>
