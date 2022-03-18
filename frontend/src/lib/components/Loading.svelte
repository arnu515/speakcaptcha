<script lang="ts">
export let center = false
export let width = 24
export let height = 24
export let durationInMs = 400
</script>

<div class={center ? "flex justify-center" : ""}>
	<div
		class="border-2 border-gray-200 rounded-full loading-spinner"
		style="border-top: 2px gray solid; width: {width}px; height: {height}px; animation-duration: {durationInMs}ms" />
</div>

<style>
.loading-spinner {
	animation: loading-spinner 1s linear infinite;
}

@keyframes loading-spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
