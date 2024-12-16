<script>
	import AppleIcon from '$lib/icons/AppleIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import Button from '../ui/Button.svelte'
	import Container from '../ui/Container.svelte'
</script>

<Container type="header">
	<Button classes="selected">
		<h4>Fazer Login</h4>
	</Button>

	<Button classes="selected">
		<h4>Fazer Cadastro</h4>
	</Button>

	<Button classes="selected">
		<h4>Esqueci a senha</h4>
	</Button>

	<Button classes="today">
		<GoogleIcon />
	</Button>

	<Button classes="today">
		<AppleIcon />
	</Button>
</Container>
