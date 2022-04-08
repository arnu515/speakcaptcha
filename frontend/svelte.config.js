import sveltePreprocess from "svelte-preprocess"
import { mdsvex as svx } from "mdsvex"

export default {
	extensions: [".svelte", ".svx"],
	preprocess: [
		sveltePreprocess({
			postcss: true
		}),
		svx({
			layout: {
				_: "./src/lib/layouts/documentation.svelte"
			},
			smartypants: {
				dashes: "oldschool"
			}
		})
	]
}
