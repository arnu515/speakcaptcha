<script lang="ts">
import { routes } from "$lib/pages/documentation/_routes.svelte"
import { Link } from "svelte-navigator"
import { slide } from "svelte/transition"

export let currentTitle = ""

const prevRoute =
	routes[routes.indexOf(routes.find(route => route.m.title === currentTitle)) - 1] ||
	undefined
const nextRoute =
	routes[routes.indexOf(routes.find(route => route.m.title === currentTitle)) + 1] ||
	undefined

export let visible = false
</script>

{#if visible}
	<div
		transition:slide
		class="bg-gray-200 border border-gray-500 rounded fixed bottom-16 right-4 max-w-sm m-4 py-4 px-6">
		<h2 class="text-3xl font-bold flex items-center justify-between">
			Documentation
			<button
				class="outline-none cursor-pointer text-black hover:text-gray-700 border border-transparent transition-all duration-500 focus:text-gray-700 focus:border-gray-500"
				aria-label="Close sidebar"
				on:click={() => (visible = false)}
				title="Close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</h2>
		<ol class="list-decimal m-0 mt-2 p-2">
			{#each routes as r}
				<li>
					<Link
						class="{currentTitle === r.m.title
							? 'text-gray-500 cursor-default'
							: 'text-blue-500 hover:underline cursor-pointer'} mt-1"
						to="/documentation/{r.m.path}">{@html r.m.title}</Link>
				</li>
			{/each}
		</ol>
		<div class="mt-4 flex items-center gap-2">
			{#if prevRoute}
				<Link to="/documentation/{prevRoute.m.path}" class="button w-full !rounded-none"
					>Previous</Link>
			{/if}
			{#if nextRoute}
				<Link to="/documentation/{nextRoute.m.path}" class="button w-full !rounded-none"
					>Next</Link>
			{/if}
		</div>
	</div>
{/if}
