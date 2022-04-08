<script lang="ts">
export let id: string
</script>

<iframe
	src="/api/captcha?application_id={import.meta.env.VITE_SPEAKCAPTCHA_ID}#{id}"
	frameborder="0"
	title="SpeakCaptcha Challenge"
	style="width: 100%;"
	allow="microphone"
	{id} />
