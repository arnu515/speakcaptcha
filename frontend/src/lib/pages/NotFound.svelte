<script lang="ts">
import { Link } from "svelte-navigator"
</script>

<div class="p-8">
	<h1 class="text-center text-5xl font-bold mt-16 mb-6">404 Not Found</h1>
	<p class="my-4 text-center text-2xl">
		This page or item doesn't exist, or has been renamed or deleted.
	</p>
	<p class="my-8 text-center flex items-center gap-2 text-xl justify-center">
		<Link to="/developers" class="button">Dashboard</Link>
		<Link to="/" class="button white">Homepage</Link>
	</p>
</div>
