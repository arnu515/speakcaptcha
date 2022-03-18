<script lang="ts">
import Developers from "$lib/pages/developers/index.svelte"
import DevelopersAuth from "$lib/pages/developers/auth.svelte"
import DevelopersNew from "$lib/pages/developers/new.svelte"
import user from "$lib/stores/user"
import { onMount } from "svelte"
import { Route } from "svelte-navigator"
import axios from "$lib/axios"
import DevelopersSlug from "$lib/pages/developers/[slug].svelte"
import Loading from "./Loading.svelte"

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
		<Route path="/developers/new">
			<DevelopersNew />
		</Route>
		<Route path="/developers/:slug">
			<DevelopersSlug />
		</Route>
	{:else}
		<Route path="/developers/*">
			<DevelopersAuth />
		</Route>
	{/if}
{:else}
	<Route path="/developers/*">
		<div class="mt-12">
			<Loading center width={64} height={64} />
		</div>
	</Route>
{/if}
