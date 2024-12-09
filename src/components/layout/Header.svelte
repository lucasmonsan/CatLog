<script lang="ts">
	import AppleIcon from '$lib/icons/AppleIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import NotificationIcon from '$lib/icons/NotificationIcon.svelte'
	import Login from '../forms/Login.svelte'
	import Signup from '../forms/Signup.svelte'
	import ForgotPassword from '../forms/ForgotPassword.svelte'
	import { logged } from '$lib/stores/user'
	import { onMount } from 'svelte'
	let visible = false
	let option: 'login' | 'signup' | 'forgot' | '' = ''

	const handleToggle = (next: 'login' | 'signup' | 'forgot' | '') => {
		if (option === next) option = ''
		else option = next
	}

	onMount(() => {
		visible = true
	})
</script>

{#if visible}
	<header class="container">
		{#if $logged}
			<img src="" alt="" />
			<div></div>
			<button>
				<NotificationIcon />
			</button>
		{:else}
			<button class="border bold" on:click={() => handleToggle('login')}>Fazer Login</button>
			<button class="border bold" on:click={() => handleToggle('signup')}>Criar Conta</button>
			<button class="border bold" on:click={() => handleToggle('forgot')}>Esqueci a Senha</button>
			<button><GoogleIcon /></button>
			<button><AppleIcon /></button>
		{/if}
	</header>

	{#if option === 'login'}
		<Login />
	{:else if option === 'signup'}
		<Signup />
	{:else if option === 'forgot'}
		<ForgotPassword />
	{/if}
{/if}

<style>
	header {
		max-height: calc(var(--base) * 4.5);
	}

	div {
		border: solid 1px red;
	}
</style>
