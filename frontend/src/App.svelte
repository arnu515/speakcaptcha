<script lang="ts">
import Navbar from "$lib/components/Navbar.svelte"
import Index from "$lib/pages/Index.svelte"
import user from "$lib/stores/user"
import { onMount } from "svelte"
import { Router, Route } from "svelte-navigator"

onMount(() => {
	fetch("/api/developers/me")
		.then(async r => ({ ...r, data: await r.json() }))
		.then(r => {
			if (r.status === 401) $user = null
			else if (r.status === 200) $user = r.data
			else console.log(r)
		})
})
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
</Router>
