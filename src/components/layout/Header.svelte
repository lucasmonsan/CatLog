<script>
	import AppleIcon from '$lib/icons/AppleIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import Button from '../ui/Button.svelte'
	import Container from '../ui/Container.svelte'
</script>

<Container type="header">
	<Button color="selected">
		<h4>Fazer Login</h4>
	</Button>

	<Button color="selected">
		<h4>Fazer Cadastro</h4>
	</Button>

	<Button color="selected">
		<h4>Esqueci a senha</h4>
	</Button>

	<Button color="today">
		<GoogleIcon />
	</Button>

	<Button color="today">
		<AppleIcon />
	</Button>
</Container>
