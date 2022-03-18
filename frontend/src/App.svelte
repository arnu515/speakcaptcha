<script lang="ts">
import DeveloperRoutes from "$lib/components/DeveloperRoutes.svelte"
import Navbar from "$lib/components/Navbar.svelte"
import Index from "$lib/pages/Index.svelte"
import { Router, Route } from "svelte-navigator"
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
	<DeveloperRoutes />
</Router>
