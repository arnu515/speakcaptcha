import { writable } from "svelte/store"
import type { User } from "./user"

export interface Application {
	id: string
	name: string
	secret: string
	created_at: number
	owner: User
}

const applications = writable<Application[] | null>(null)

export default applications
