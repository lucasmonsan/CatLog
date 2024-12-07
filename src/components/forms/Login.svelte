<script lang="ts">
	import Input from '../ui/Input.svelte'

	let email = ''
	let password = ''
</script>

<form class="container">
	<Input type="email" id="Email" placeholder="Email" value={email} />
	<Input type="password" id="Password" placeholder="Senha" value={password} />
	<button class="w-100">
		<strong>Entrar</strong>
	</button>
</form>

<style>
	form {
		flex-direction: column;
		gap: calc(var(--base) * 0.75);
		max-height: calc(var(--base) * 10);
	}
</style>
