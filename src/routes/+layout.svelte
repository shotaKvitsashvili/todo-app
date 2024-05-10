<script>
	import Header from '$lib/components/header/Header.svelte';
    import "../app.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	
</style>
