<script lang="ts">
import axios from "$lib/axios"
import ApplicationCard from "$lib/components/ApplicationCard.svelte"
import Loading from "$lib/components/Loading.svelte"
import applications from "$lib/stores/applications"
import user from "$lib/stores/user"
import { onMount } from "svelte"
import { Link } from "svelte-navigator"

onMount(async () => {
	const { data, status } = await axios.get("/api/developers/applications")

	if (status === 200) $applications = data.applications
	else if (status === 401) $user = null
	else {
		alert(
			"An error occured while trying to fetch your applications. You can press F12 to look at the error."
		)
		console.error("Error while fetching applications:", { data, status })
	}
})
</script>

{#if $user}
	<h1 class="text-center text-5xl font-bold mt-16 mb-6">
		Welcome, <strong class="font-black">{$user.username}</strong>
	</h1>
	<p class="text-center my-4 text-2xl">
		to your <strong class="font-bold">Speak</strong>Captcha developer dashboard.
	</p>
	<div class="my-6 text-center">
		<Link
			to="/developers/new"
			class="bg-blue-500 hover:bg-blue-600 text-white hover:no-underline px-4 py-2 rounded"
			>Create a new application</Link>
	</div>
	<div class="my-12 mx-6">
		{#if $applications === null}
			<Loading center />
		{:else if $applications.length}
			{#each $applications as a}
				<ApplicationCard application={a} />
			{/each}
		{:else}
			<p class="text-center text-xl">You don't have any applications yet.</p>
		{/if}
	</div>
{/if}
