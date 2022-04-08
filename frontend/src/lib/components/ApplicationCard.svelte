<script lang="ts">
import type { Application } from "$lib/stores/applications"
import { Link } from "svelte-navigator"

export let application: Application

function formatDate(date: Date) {
	const x = {
		"1": "st",
		"2": "nd",
		"3": "rd",
		"21": "st",
		"22": "nd",
		"23": "rd",
		"31": "st"
	}
	const m = {
		"1": "January",
		"2": "February",
		"3": "March",
		"4": "April",
		"5": "May",
		"6": "June",
		"7": "July",
		"8": "August",
		"9": "September",
		"10": "October",
		"11": "November",
		"12": "December"
	}
	return `Created: ${date.getDate()}${x[date.getDate()] || "th"} of ${
		m[date.getMonth() + 1]
	}, ${date.getFullYear()}`
}
</script>

<Link
	to="/developers/{application.id}"
	class="bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-400 block mb-4 mx-auto max-w-screen-lg rounded px-4 py-2">
	<h3 class="text-2xl font-semibold my-2">{application.name}</h3>
	<p class="text-lg font-mono text-gray-500 my-1">
		{formatDate(new Date(parseInt(application.created_at.toString() + "000")))}
	</p>
	<p class="text-sm text-gray-500 my-1">Click to view</p>
</Link>
