<script lang="ts">
import { Link } from "svelte-navigator"
</script>

<div class="px-8">
	<h1 class="text-center text-5xl font-bold mt-16 mb-6">
		<strong class="font-black">Speak</strong>Captcha
	</h1>
	<p class="my-4 text-center text-2xl">The captcha that works by speaking.</p>
	<p class="my-4 text-center text-xl">
		<strong>Speak</strong>Captcha makes users speak the captcha text to the computer
		instead of clicking images.
	</p>

	<p class="my-8 text-center flex items-center text-xl justify-center">
		<Link to="/developers" class="button">Get started</Link>
	</p>
</div>

<div class="bg-gray-200 p-8">
	<h2 class="text-center text-3xl font-bold mt-4 mb-4">Captcha like never before</h2>
	<p class="my-4 text-center text-xl">
		<strong>Speak</strong>Captcha uses your microphone to make you complete the captcha.
		This makes it easier for you to complete captchas while still keeping bots away.
	</p>
	<p class="mt-8 mb-4 text-center flex items-center text-xl justify-center">
		<Link to="/developers" class="button">Try it now</Link>
	</p>
</div>

<div class="bg-white p-8">
	<h2 class="text-center text-3xl font-bold mt-4 mb-4">Accessible to everyone</h2>
	<p class="my-4 text-center text-xl">
		If you are visually impaired or can't complete the captcha due to other reasons, you
		can apply for an accessibility pass.
	</p>
	<p class="mt-8 mb-4 text-center flex items-center text-xl justify-center">
		<Link to="/accessibility" class="button">Apply for a pass</Link>
	</p>
</div>

<div class="bg-gray-200 p-8">
	<h2 class="text-center text-3xl font-bold mt-4 mb-4">Made for developers</h2>
	<p class="my-4 text-center text-xl">
		<strong>Speak</strong>Captcha is made with developers in mind. It is very easy to
		integrate <strong>Speak</strong>Captcha in your web application. Read the docs to
		get started.
	</p>
	<p class="mt-8 mb-4 text-center flex items-center gap-2 text-xl justify-center">
		<Link to="/documentation" class="button">Read the docs</Link>
		<a
			href="https://examples.speakcaptcha.gq"
			class="button !bg-white !hover:bg-gray-200 !focus:bg-gray-200 !text-blue-500"
			>View examples</a>
	</p>
</div>
