<script lang="ts">
import Loading from "$lib/components/Loading.svelte"
import applications, { Application } from "$lib/stores/applications"
import { parseFastApiError } from "$lib/util"
import axios from "axios"
import { onMount } from "svelte"
import { useParams, useNavigate, Link, useLocation } from "svelte-navigator"

const params = useParams()
const navigate = useNavigate()
const location = useLocation()
let app: Application | null | undefined = ($applications || []).find(
	a => a.id === $params.slug
)
let secret = $location.state?.secret || ""

async function fetchApp() {
	const { data, status } = await axios.get(
		"/api/developers/applications/" + $params.slug
	)

	if (status === 200) app = data.application
	else {
		app = null
		console.error("Error while fetching application:", { data, status })
	}
}

onMount(fetchApp)

let enteredName = ""
async function updateApp() {
	if (!app) return
	if (!enteredName.trim()) return alert("Please enter a name")

	const { data, status } = await axios.put("/api/developers/applications/" + app.id, {
		name: enteredName
	})

	if (status === 200) {
		await fetchApp()
	} else {
		alert(parseFastApiError(data))
		console.error("Error while updating application:", { data, status })
	}
}

async function regenSecret() {
	if (!app) return

	const { data, status } = await axios.put(
		"/api/developers/applications/" + app.id + "/secret"
	)

	if (status === 200) {
		await fetchApp()
		secret = data.secret
	} else {
		alert(parseFastApiError(data))
		console.error("Error while generating new secret:", { data, status })
	}
}

async function deleteApp() {
	if (!app) return
	if (
		!window.confirm(
			"Are you sure you want to delete this application? This action is IRREVERSIBLE"
		)
	)
		return

	const { data, status } = await axios.delete("/api/developers/applications/" + app.id)

	if (status === 200) {
		navigate("/developers")
	} else {
		alert(parseFastApiError(data))
		console.error("Error while generating new secret:", { data, status })
	}
}
</script>

<h1 class="text-center text-5xl font-bold mt-16 mb-6">Editing application</h1>
{#if app === undefined}
	<Loading center />
{:else if app === null}
	<h1 class="text-center text-3xl font-bold m-6">App not found.</h1>
	<p class="text-center my-4 text-2xl">Could not find an application with this ID.</p>
	<p class="my-4 text-center flex items-center text-xl justify-center gap-2">
		<button
			on:click={() => navigate(-1)}
			class="bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-4 py-2 rounded"
			>Get started</button>
		<Link
			to="/developers"
			class="bg-gray-500 hover:bg-gray-600 text-white hover:no-underline px-4 py-2 rounded"
			>Dashboard</Link>
	</p>
{:else}
	<form
		on:submit|preventDefault={updateApp}
		class="mx-4 lg:mx-auto my-12 max-w-screen-lg p-4 bg-gray-50 border border-gray-200 rounded-xl">
		<label for="name" class="font-medium block mb-2">Name of your application</label>
		<input
			type="text"
			id="name"
			class="block w-[80%] bg-white border border-gray-400 rounded px-2 py-1 outline-none focus:border-black"
			placeholder={app.name || "Enter the name of your application."}
			bind:value={enteredName} />
		<p class="my-4">
			<button
				class="bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-4 py-2 rounded"
				>Update application</button>
			<button
				type="button"
				on:click={() => navigate(-1)}
				class="bg-gray-500 hover:bg-gray-600 text-white hover:no-underline px-4 py-2 rounded ml-2"
				>Go back</button>
		</p>
	</form>

	<div
		class="mx-4 lg:mx-auto my-12 max-w-screen-lg p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-2">
		<h3 class="text-2xl">Application credentials</h3>
		<p class="text-xl">
			You need these credentials to use <strong class="font-bold">Speak</strong>Captcha
			in your app.
		</p>
		<div class="flex gap-2 items-center">
			<span>App ID:</span>
			<input
				type="text"
				on:click={e => e.target["select"]()}
				class="bg-white border border-gray-200 outline-none focus:border-black w-full max-w-screen-md px-1 font-mono"
				readonly
				value={app.id} />
		</div>
		<div class="flex gap-2 items-center">
			<span>Secret:</span>
			{#if secret}
				<input
					type="text"
					on:click={e => e.target["select"]()}
					class="bg-white border border-gray-200 outline-none focus:border-black w-full max-w-screen-md px-1 font-mono"
					readonly
					value={secret} />
			{:else}
				<button
					class="text-blue-500 hover:text-blue-600 transition-colors underline cursor-pointer"
					on:click={regenSecret}>Regenerate secret</button>
			{/if}
		</div>
		{#if secret}
			<span class="font-mono"
				>This secret will not be shown again! Be sure to copy it.</span>
		{/if}
	</div>

	<div
		class="mx-4 lg:mx-auto my-12 max-w-screen-lg p-4 bg-red-200 border border-red-500 rounded-xl flex flex-col gap-2">
		<h3 class="text-2xl text-red-500">Delete application</h3>
		<p class="text-xl">
			This action is <strong>IRREVERSIBLE</strong>. Please proceed with
			<strong>CAUTION</strong>.
		</p>
		<p>
			<button
				class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition-colors cursor-pointer rounded"
				on:click={deleteApp}>Delete application</button>
		</p>
	</div>
{/if}
