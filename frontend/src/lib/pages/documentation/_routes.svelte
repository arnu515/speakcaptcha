<script lang="ts" context="module">
import GettingStarted, {
	metadata as gettingStartedMetadata
} from "./getting-started.svx"
import HTUS, { metadata as htusMetadata } from "./how-to-use-speakcaptcha.svx"
import Tutorial, { metadata as tutorialMetadata } from "./tutorial.svx"
import Troubleshooting, { metadata as tsMetadata } from "./troubleshooting.svx"

export const routes = [
	{ c: HTUS, m: htusMetadata },
	{ c: GettingStarted, m: gettingStartedMetadata },
	{ c: Tutorial, m: tutorialMetadata },
	{ c: Troubleshooting, m: tsMetadata }
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
