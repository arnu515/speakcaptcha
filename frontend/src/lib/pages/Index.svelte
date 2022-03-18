<script lang="ts">
import { Link } from "svelte-navigator"
</script>

<h1 class="text-center text-5xl font-bold mt-16 mb-6">
	<strong class="font-black">Speak</strong>Captcha
</h1>
<p class="my-4 text-center text-2xl">The captcha that works by speaking.</p>
<p class="my-4 text-center">
	Speak captcha makes users speak the captcha text to the computer instead of clicking
	images.
</p>

<p class="my-4 text-center flex items-center text-xl justify-center">
	<Link
		to="/developers"
		class="bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-4 py-2 rounded"
		>Get started</Link
	>
</p>
