<script>
	import AppleIcon from '$lib/icons/AppleIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import Container from '../ui/Container.svelte'
</script>

<Container type="header">
	<button class="selected">
		<h4>Fazer Login</h4>
	</button>

	<button class="selected">
		<h4>Fazer Cadastro</h4>
	</button>

	<button class="selected">
		<h4>Esqueci a senha</h4>
	</button>

	<button class="today">
		<GoogleIcon />
	</button>

	<button class="today">
		<AppleIcon />
	</button>
</Container>
