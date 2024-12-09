<script lang="ts">
	import Input from '../ui/Input.svelte'

	let email = ''
</script>

<form class="container">
	<Input type="email" id="Email" placeholder="Email" value={email} />
	<button class="w-100">
		<strong>Enviar Email de Recuperação</strong>
	</button>
</form>

<style>
	form {
		flex-direction: column;
		gap: calc(var(--base) * 0.75);
	}
</style>
