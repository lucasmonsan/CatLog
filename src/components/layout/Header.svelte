<script lang="ts">
	import AppleIcon from '$lib/icons/AppleIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import { onMount } from 'svelte'
	import Container from '../ui/Container.svelte'
	import Input from '../ui/Input.svelte'

	let visible = false

	let option: 'login' | 'signup' | 'forgot' | '' = ''
	let email = ''
	let password = ''
	let confirmPassword = ''
	let name = ''

	let isFormValid = false

	onMount(() => {
		visible = true
	})

	$: {
		if (option === 'login') {
			isFormValid = email.trim() !== '' && password.trim() !== ''
		} else if (option === 'signup') {
			isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && name.trim() !== '' && password === confirmPassword
		} else {
			isFormValid = false
		}
	}
</script>

{#if visible}
	<Container>
		<div>
			<button class="selected" style="flex: 1;" on:click={() => (option = option !== 'login' ? 'login' : '')}>
				<h3>Login</h3>
			</button>

			<button class="selected" style="flex: 1;" on:click={() => (option = option !== 'signup' ? 'signup' : '')}>
				<h3>Cadastro</h3>
			</button>

			<button class="today">
				<GoogleIcon />
			</button>

			<button class="today">
				<AppleIcon />
			</button>
		</div>

		{#if option !== ''}
			<form action="">
				<Input id="email" type="email" placeholder="Email" bind:value={email} />
				{#if option === 'login' || option === 'signup'}
					<Input id="password" type="password" placeholder="Senha" bind:value={password} />
				{/if}
				{#if option === 'signup'}
					<Input id="confirmPassword" type="password" placeholder="Confirmar senha" bind:value={confirmPassword} />
					<Input id="name" type="profile" placeholder="Nome completo" bind:value={name} />
				{/if}
				{#if option === 'login'}
					<button class="transparent" style="height: calc(var(--base) * 1.5);" on:click={() => {}}> Esqueceu sua senha? </button>
				{/if}
				<button class={!isFormValid ? '' : 'success'} disabled={!isFormValid} aria-label={option === 'login' ? 'Entrar' : option === 'signup' ? 'Criar conta' : 'Enviar email de recuperação'}>
					<h3>{option === 'login' ? 'Entrar' : option === 'signup' ? 'Criar conta' : 'Enviar email de recuperação'}</h3>
				</button>
			</form>
		{/if}
	</Container>
{/if}

<style>
	div {
		display: flex;
		gap: var(--gap-2);
		width: 100%;
	}

	button {
		height: calc(var(--base) * 2.75);
	}

	button.today {
		min-width: calc(var(--base) * 2.25);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
		width: 100%;
		margin-top: calc(var(--base) * 0.5);
	}
</style>
