import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const proxy = mode === "development" ? 
			{
				"/api": {
					target: "http://localhost:5000",
					changeOrigin: true
				}
			} 
			: undefined
	return {
		plugins: [svelte()],
		server: {
			proxy
		},
		resolve: {
			alias: {
				$lib: resolve("./src/lib")
			}
		}
	}
})
