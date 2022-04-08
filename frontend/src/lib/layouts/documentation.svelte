<script lang="ts">
export let title: string
export let summary: string
</script>

<div class="prose md:prose-lg lg:prose-xl max-w-screen-lg mx-auto p-8 my-8">
	<h1 class="text-6xl font-bold mt-12 mb-4">{@html title}</h1>
	<p class="text-2xl mb-4">{@html summary}</p>
	<hr class="border-t border-gray-300 w-[70%] ml-4 my-8" />
	<slot />
</div>
