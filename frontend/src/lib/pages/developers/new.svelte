<script lang="ts">
import axios from "$lib/axios"
import { parseFastApiError } from "$lib/util"
import { useNavigate } from "svelte-navigator"

let enteredName = ""
let navigate = useNavigate()

async function createApp() {
	if (!enteredName.trim()) return alert("Please enter a name")

	const { data, status } = await axios.post("/api/developers/applications", {
		name: enteredName
	})

	if (status === 200) {
		navigate(`/developers/applications/${data.application.id}`)
	} else {
		alert(parseFastApiError(data))
		console.error("Error while creating application:", { data, status })
	}
}
</script>

<h1 class="text-center text-5xl font-bold mt-16 mb-6">
	Create a <strong class="font-black">Speak</strong>Captcha application
</h1>
<p class="text-center my-4 text-2xl">
	You need to create an application to use <strong class="font-bold">Speak</strong
	>Captcha in your program.
</p>

<form
	on:submit|preventDefault={createApp}
	class="mx-4 lg:mx-auto my-12 max-w-screen-lg p-4 bg-gray-50 border border-gray-200 rounded-xl">
	<label for="name" class="font-medium block mb-2">Name of your application</label>
	<input
		type="text"
		id="name"
		class="block w-[80%] bg-white border border-gray-400 rounded px-2 py-1 outline-none focus:border-black"
		placeholder="Enter the name of your application."
		bind:value={enteredName} />
	<span class="text-sm font-mono mt-2 text-gray-500"
		>This name will be shown to your users.</span>
	<p class="my-4">
		<button
			class="bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-4 py-2 rounded"
			>Create application</button>
		<button
			type="button"
			on:click={() => navigate(-1)}
			class="bg-gray-500 hover:bg-gray-600 text-white hover:no-underline px-4 py-2 rounded ml-2"
			>Go back</button>
	</p>
</form>
