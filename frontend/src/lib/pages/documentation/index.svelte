<script lang="ts">
import { Link, useNavigate } from "svelte-navigator"
import { routes } from "./_routes.svelte"

const navigate = useNavigate()
</script>

<div class="p-8">
	<h1 class="text-center text-5xl font-bold mt-16 mb-6">
		<strong class="font-black">Speak</strong>Captcha Documentation
	</h1>
	<p class="my-4 text-center text-2xl">
		Welcome to the <strong>Speak</strong>Captcha documentation
	</p>
	<p class="my-8 text-center flex items-center gap-2 text-xl justify-center">
		<Link to="/developers" class="button">Dashboard</Link>
		<Link to="/" class="button white">Homepage</Link>
	</p>
</div>

<div class="p-8 grid grid-cols-1 md:grid-cols-2 max-w-screen-md mx-auto gap-4">
	{#each routes as r}
		<div
			role="link"
			title="Go to {r.m.title}"
			class="bg-gray-50 border border-gray-500 rounded shadow hover:bg-gray-100 focus:bg-gray-100 focus:border-black cursor-pointer px-4 py-2 overflow-hidden transition-all duration-500"
			on:click={() => navigate("/documentation/" + r.m.path)}>
			<h2 class="text-xl font-bold">{@html r.m.title}</h2>
			<p class="text-lg text-gray-500 mt-4">{@html r.m.summary}</p>
		</div>
	{/each}
</div>
