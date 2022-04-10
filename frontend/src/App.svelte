<script lang="ts">
import DeveloperRoutes from "$lib/components/DeveloperRoutes.svelte"
import Navbar from "$lib/components/Navbar.svelte"
import Index from "$lib/pages/Index.svelte"
import A11y from "$lib/pages/Accessibility.svelte"
import NotFound from "$lib/pages/NotFound.svelte"
import Docs from "$lib/pages/Docs.svelte"
import DocumentationRoutes from "$lib/pages/documentation/_routes.svelte"
import { Router, Route } from "svelte-navigator"
import { SvelteToast } from "@zerodevx/svelte-toast"
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
	<Route path="/accessibility">
		<A11y />
	</Route>
	<Route path="/docs">
		<Docs />
	</Route>
	<DocumentationRoutes />
	<DeveloperRoutes />
	<SvelteToast />
	<Route path="/*">
		<NotFound />
	</Route>
</Router>
