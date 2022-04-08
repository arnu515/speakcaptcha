<script>
// Typescript doesn't work here for some reason
import DocumentationSidebar from "$lib/components/DocumentationSidebar.svelte"
import { routes } from "$lib/pages/documentation/_routes.svelte"
import { Link } from "svelte-navigator"

export let title
export let summary

let sidebarVisible = false

const prevRoute =
	routes[routes.indexOf(routes.find(route => route.m.title === title)) - 1] || undefined
const nextRoute =
	routes[routes.indexOf(routes.find(route => route.m.title === title)) + 1] || undefined
</script>

<div class="max-w-screen-lg mx-auto p-8 my-8">
	<h1 class="text-5xl font-bold mt-12 mb-4">{@html title}</h1>
	<p class="text-2xl mb-4">{@html summary}</p>
	<div class="mt-4 flex items-center gap-2">
		{#if prevRoute}
			<Link
				to="/documentation/{prevRoute.m.path}"
				class="button !px-2 !py-1 !rounded-none">Previous</Link>
		{/if}
		{#if nextRoute}
			<Link
				to="/documentation/{nextRoute.m.path}"
				class="button !px-2 !py-1 !rounded-none">Next</Link>
		{/if}
	</div>
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

<style global>
code[class*="language-"],
pre[class*="language-"] {
	color: #ccc;
	background: 0 0;
	font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
	font-size: 1em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}
pre[class*="language-"] {
	padding: 1em;
	margin: 0.5em 0;
	overflow: auto;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #2d2d2d;
}
:not(pre) > code[class*="language-"] {
	padding: 0.1em;
	border-radius: 0.3em;
	white-space: normal;
}
.token.block-comment,
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
	color: #999;
}
.token.punctuation {
	color: #ccc;
}
.token.attr-name,
.token.deleted,
.token.namespace,
.token.tag {
	color: #e2777a;
}
.token.function-name {
	color: #6196cc;
}
.token.boolean,
.token.function,
.token.number {
	color: #f08d49;
}
.token.class-name,
.token.constant,
.token.property,
.token.symbol {
	color: #f8c555;
}
.token.atrule,
.token.builtin,
.token.important,
.token.keyword,
.token.selector {
	color: #cc99cd;
}
.token.attr-value,
.token.char,
.token.regex,
.token.string,
.token.variable {
	color: #7ec699;
}
.token.entity,
.token.operator,
.token.url {
	color: #67cdcc;
}
.token.bold,
.token.important {
	font-weight: 700;
}
.token.italic {
	font-style: italic;
}
.token.entity {
	cursor: help;
}
.token.inserted {
	color: green;
}
</style>
