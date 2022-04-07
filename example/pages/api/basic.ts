import type { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
	function sendError(message: string) {
		res.redirect("/basic?error=" + encodeURIComponent(message))
	}

	if (typeof req.body !== "object") return sendError("Invalid request")
	let { name, email, terms, process_token, captcha_id } = req.body
	if (typeof name === "string") name = name.trim()
	else return sendError("Please enter a name")
	if (typeof email === "string") email = email.trim()
	else return sendError("Please enter an email")
	terms = !!terms
	if (typeof process_token === "string") process_token = process_token.trim()
	else return sendError("Please solve the captcha")
	if (typeof captcha_id === "string") captcha_id = captcha_id.trim()
	else return sendError("Please solve the captcha")

	// Make sure that the captcha hasn't been tampered with by validating it.
	// You'll need the process_token and captcha_id now.
	const resp = await fetch(
		process.env.NEXT_PUBLIC_SPEAKCAPTCHA_URL + "/api/captcha/validate",
		{
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Basic " +
					Buffer.from(
						`${process.env.NEXT_PUBLIC_SPEAKCAPTCHA_APP_ID}:${process.env.SPEAKCAPTCHA_SECRET}`
					).toString("base64")
			},
			method: "POST",
			body: JSON.stringify({
				process_token,
				captcha_id
			})
		}
	)
	const data = await resp.json()

	if (data.success) {
		// The captcha was valid.
		res.redirect("/basic?success=true")
	} else {
		// The captcha was invalid.
		sendError(`${data.error}: ${data.error_description}`)
	}
}

export default handler
