export function parseFastApiError(data: Record<string, any>): string {
	if (data.error) {
		return `${data.error}: ${data.error_description || data.error}`
	}
	if (Array.isArray(data.detail)) {
		let msg = ""
		for (const item of data.detail) {
			msg += `- ${(item.loc || ["field"]).join(".")}: ${item.msg}\n`
		}
		return (
			msg ||
			"An error occured while trying to create your application. You can press F12 to look at the error."
		)
	}
	return "An error occured while trying to create your application. You can press F12 to look at the error."
}
