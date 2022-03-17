<script lang="ts">
import { onMount } from "svelte"

onMount(() => {
	fetch("/api/")
		.then(r => r.json())
		.then(console.log)
})
</script>

<h1 class="text-center">Test</h1>
