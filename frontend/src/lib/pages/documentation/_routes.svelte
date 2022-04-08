<script lang="ts">
import { Route } from "svelte-navigator"
import Index from "./index.svelte"

import GettingStarted, {
	metadata as gettingStartedMetadata
} from "./getting-started.svx"

const routes = [{ c: GettingStarted, m: gettingStartedMetadata }]
</script>

<Route path="/documentation">
	<Index />
</Route>

{#each routes as r}
	<Route path="/documentation/{r.m.path}">
		<svelte:component this={r.c} />
	</Route>
{/each}
