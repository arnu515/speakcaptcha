/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svx" {
	export const metadata: Record<string, any>
	export default any
}
