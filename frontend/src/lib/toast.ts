import { toast, SvelteToastOptions } from "@zerodevx/svelte-toast"

export const successTheme = {
	"--toastBackground": "rgb(34, 197, 94)",
	"--toastColor": "white",
	"--toastBarBackground": "rgb(134, 239, 172)"
}

export const success = (m: string, opts: SvelteToastOptions = {}) =>
	toast.push(m, { theme: successTheme, ...opts })

export const errorTheme = {
	"--toastBackground": "rgb(239, 68, 68)",
	"--toastColor": "white",
	"--toastBarBackground": "rgb(252, 165, 165)"
}

export const error = (m: string, opts: SvelteToastOptions = {}) =>
	toast.push(m, { theme: errorTheme, ...opts })
