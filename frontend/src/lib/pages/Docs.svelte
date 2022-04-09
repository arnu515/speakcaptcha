<script>
import { onMount } from "svelte"
import { useNavigate } from "svelte-navigator"
const n = useNavigate()

onMount(() => n("/documentation"))
</script>

<p class="p-4">Redirecting...</p>
