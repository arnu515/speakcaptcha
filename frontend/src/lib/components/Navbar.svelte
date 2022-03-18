<script lang="ts">
import user from "$lib/stores/user"
import { Link } from "svelte-navigator"
</script>

<nav class="navbar-xp3ij9">
	<Link to="/"><strong>Speak</strong>Captcha</Link>
	<ul>
		<li><Link to="/developers/docs">Documentation</Link></li>
		<li>
			<Link class="get-started" to="/developers"
				>{$user ? "Dashboard" : "Get started"}</Link
			>
		</li>
	</ul>
</nav>

<style lang="postcss" global>
nav.navbar-xp3ij9 {
	@apply mx-2 md:mx-4 lg:mx-auto max-w-screen-lg px-4 py-2 bg-gray-200 border border-gray-400 rounded-xl text-lg mt-4 flex items-center justify-between;
}
nav.navbar-xp3ij9 > a {
	@apply cursor-pointer font-bold;
}

nav.navbar-xp3ij9 > a strong {
	@apply font-black;
}

nav.navbar-xp3ij9 ul {
	@apply flex gap-4 items-center;
}

nav.navbar-xp3ij9 li a {
	@apply text-gray-800 hover:text-gray-900 hover:underline transition-colors;
}

nav.navbar-xp3ij9 li a.get-started {
	@apply bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-2 py-1 rounded;
}
</style>
