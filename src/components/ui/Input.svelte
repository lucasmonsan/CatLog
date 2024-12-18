<script lang="ts">
	import EmailIcon from '$lib/icons/EmailIcon.svelte'
	import PasswordIcon from '$lib/icons/PasswordIcon.svelte'
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
	import { onMount } from 'svelte'

	export let disabled: boolean = false
	export let id: string
	export let type: 'text' | 'email' | 'number' | 'password' | 'profile' | 'time' | 'date' = 'text'
	export let value: string = ''
	export let placeholder: string = ''
	export let align: 'left' | 'right' | 'center' = 'left'
	export let focusIn: () => void = () => {}
	export let focusOut: () => void = () => {}
	export let onInput: (value: string) => void = () => {}

	const handleInput = (e: Event): void => {
		const target = e.target as HTMLInputElement | null
		if (target) onInput(target.value)
	}

	onMount(() => {
		if (type === 'email') document.getElementById(id)?.focus()
		else if (type === 'time') placeholder = '00:00'
	})
</script>

<label for={id} class={value === '' ? '' : 'using'}>
	{#if ['email', 'password', 'profile'].includes(type)}
		<div>
			{#if type === 'email'}
				<EmailIcon />
			{:else if type === 'password'}
				<PasswordIcon />
			{:else if type === 'profile'}
				<ProfileIcon />
			{/if}
		</div>
	{/if}
	<input type={type === 'profile' ? 'text' : type} {id} {placeholder} bind:value on:input={handleInput} on:focusin={focusIn} on:focusout={focusOut} {disabled} class={align} />
</label>

<style>
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--gap-2);
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: calc(var(--base) * 0.125) 0 0 0;
		font-size: calc(var(--base) * 1.25);
		font-family: var(--family-1);
		color: var(--text-color);
		background-color: transparent;
		border: none;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		background: none;

		&.center {
			text-align: center;
		}

		&::-webkit-date-and-time-value {
			appearance: none;
			margin: 0;
			width: 100%;
			text-align: center;
		}
		&::-webkit-calendar-picker-indicator {
			display: none;
		}
	}
</style>
