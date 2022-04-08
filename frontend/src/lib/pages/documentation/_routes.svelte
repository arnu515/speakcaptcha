<script lang="ts" context="module">
import GettingStarted, {
	metadata as gettingStartedMetadata
} from "./getting-started.svx"
import Test, { metadata as testMetadata } from "./test.svx"

export const routes = [
	{ c: GettingStarted, m: gettingStartedMetadata },
	{ c: Test, m: testMetadata }
]
</script>

<script lang="ts">
import { Route } from "svelte-navigator"
import Index from "./index.svelte"
</script>

<Route path="/documentation">
	<Index />
</Route>

{#each routes as r}
	<Route path="/documentation/{r.m.path}">
		<svelte:component this={r.c} />
	</Route>
{/each}
