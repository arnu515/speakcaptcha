<script lang="ts" context="module">
import GettingStarted, {
	metadata as gettingStartedMetadata
} from "./getting-started.svx"
import HTUS, { metadata as htusMetadata } from "./how-to-use-speakcaptcha.svx"

export const routes = [
	{ c: GettingStarted, m: gettingStartedMetadata },
	{ c: HTUS, m: htusMetadata }
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
