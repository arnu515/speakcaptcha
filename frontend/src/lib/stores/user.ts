import { writable } from "svelte/store"

export interface User {
	id: string
	username: string
	email: string
}

const user = writable<User | null>(null)

export default user
