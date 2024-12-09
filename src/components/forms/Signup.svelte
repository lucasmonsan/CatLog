<script lang="ts">
	import Input from '../ui/Input.svelte'

	let fullName = ''
	let email = ''
	let password = ''
	let password2 = ''
</script>

<form class="container">
	<Input type="profile" id="Name" placeholder="Nome" value={fullName} />
	<Input type="email" id="Email" placeholder="Email" value={email} />
	<Input type="password" id="Password" placeholder="Senha" value={password} />
	<Input type="password" id="Password2" placeholder="Repita a senha" value={password2} />
	<button class="w-100">
		<strong>Cadastrar</strong>
	</button>
</form>

<style>
	form {
		flex-direction: column;
		gap: calc(var(--base) * 0.75);
	}
</style>
