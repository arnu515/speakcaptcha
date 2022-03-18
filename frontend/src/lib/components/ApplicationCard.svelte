<script lang="ts">
import type { Application } from "$lib/stores/applications"
import { Link } from "svelte-navigator"

export let application: Application
</script>

<Link
	to="/developers/{application.id}"
	class="bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-400 block mb-4 mx-auto max-w-screen-lg rounded px-4 py-2">
	<h3 class="text-2xl font-semibold my-2">{application.name}</h3>
	<p class="text-lg font-mono text-gray-500 my-1">{application.id}</p>
</Link>
