<script lang="ts">
import DeveloperRoutes from "$lib/components/DeveloperRoutes.svelte"
import Navbar from "$lib/components/Navbar.svelte"
import Index from "$lib/pages/Index.svelte"
import Docs from "$lib/pages/Docs.svelte"
import { Router, Route } from "svelte-navigator"
import { SvelteToast } from "@zerodevx/svelte-toast"
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
	<Route path="/docs">
		<Docs />
	</Route>
	<DeveloperRoutes />
	<SvelteToast />
</Router>
