<script>
// Typescript doesn't work here for some reason
import DocumentationSidebar from "$lib/components/DocumentationSidebar.svelte"

export let title
export let summary

let sidebarVisible = false
</script>

<div class="max-w-screen-lg mx-auto p-8 my-8">
	<h1 class="text-5xl font-bold mt-12 mb-4">{@html title}</h1>
	<p class="text-2xl mb-4">{@html summary}</p>
	<hr class="border-t border-gray-300 w-[70%] ml-4 my-8" />
	<div class="prose md:prose-lg lg:prose-xl">
		<slot />
	</div>
</div>

<button
	class="button gray fixed bottom-4 right-4 !rounded-none !p-2 m-4"
	on:click={() => (sidebarVisible = !sidebarVisible)}>
	{#if sidebarVisible}
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
				d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
		</svg>
	{:else}
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
				d="M5 11l7-7 7 7M5 19l7-7 7 7" />
		</svg>
	{/if}
</button>

<DocumentationSidebar bind:visible={sidebarVisible} currentTitle={title} />
