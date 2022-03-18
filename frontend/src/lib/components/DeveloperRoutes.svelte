<script lang="ts">
import DevelopersAuth from "$lib/pages/developers/auth.svelte"
import Developers from "$lib/pages/developers/index.svelte"
import user from "$lib/stores/user"
import { onMount } from "svelte"
import { Route } from "svelte-navigator"
import axios from "$lib/axios"

let loading = true

onMount(async () => {
	const { data, status } = await axios.get("/api/developers/me")

	loading = false
	if (status !== 200) $user = null
	else $user = data
})
</script>

{#if !loading}
	{#if $user}
		<Route path="/developers">
			<Developers />
		</Route>
	{:else}
		<Route path="/developers/*">
			<DevelopersAuth />
		</Route>
	{/if}
{:else}
	<Route path="/developers/*">
		<h1>Loading...</h1>
	</Route>
{/if}
