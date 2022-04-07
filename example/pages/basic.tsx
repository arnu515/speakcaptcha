import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

const CAPTCHA_IDENTIFIER = "basic"

interface SpeakCaptchaMessage {
	// The name of the event. Currently, only "solved", "error", and "invalid" are sent.
	event: string
	// The captcha's identifier you set earlier
	identifier: string
	data: {
		// The direct response returned by the backend.
		// Only available if the name is "error" or "invalid".
		detail?: {
			error: string
			error_description: string
		}
		// The captcha's internal id, different from the identifier.
		// You'll need this later on, to verify the response.
		captcha_id: string
		// The captcha's solution, i.e. the six numbers on the captcha, as a string
		// Only available if the event is "solved"
		solution?: string
		// The process token for the response. You'll need this to verify the response
		// Only available if the event is "solved"
		process_token?: string
	}
}

const WithEvents: NextPage = () => {
	const [isCaptchaInvalid, setIsCaptchaInvalid] = useState(false)
	const [isCaptchaSolved, setIsCaptchaSolved] = useState(false)
	const [captchaId, setCaptchaId] = useState("")
	const [processToken, setProcessToken] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		// Creating a function that will run once the page loads

		// Listen to the "message" event on the window.
		// You only need to do this once per page, even if you have multiple captchas.

		window.addEventListener("message", e => {
			// e.data will contain the data sent by the captcha.
			// Refer to the docs to understand how this will be structured.
			console.log("Received event:", e.data)

			const { event, data, identifier } = e.data as SpeakCaptchaMessage

			// Make sure the identifier is correct
			if (identifier !== CAPTCHA_IDENTIFIER) return

			switch (event) {
				case "invalid":
					// The captcha is incorrect (the numbers weren't said correctly)
					setError(`${data.detail!.error}: ${data.detail!.error_description}`)
					setIsCaptchaInvalid(true)
					break
				case "error":
					// Some unknown error occured
					setError(`${data.detail!.error}: ${data.detail!.error_description}`)
					console.log("An error occured!")
					break
				case "solved":
					// The captcha is solved
					setIsCaptchaSolved(true)
					setProcessToken(data.process_token!)
					setCaptchaId(data.captcha_id)
					break
				default:
					break
			}
		})

		// unrelated to speakcaptcha -- get error and success from query string
		const e = new URLSearchParams(window.location.search.replace("?", "")).get("error")
		const s = new URLSearchParams(window.location.search.replace("?", "")).get(
			"success"
		)
		setError(e || "")
		setSuccess(!!s)
		window.history.replaceState({}, "", window.location.pathname)
	}, [])

	return (
		<>
			<Head>
				<title>SpeakCaptcha Demo: With Events</title>
			</Head>
			<div className="p-4">
				<p className="my-8 text-lg font-semibold text-red-500">{error}</p>
				<h1 className="my-4 text-4xl">Demo form</h1>
				{!success ? (
					<>
						<p className="my-4 text-xl">
							Here's a simple demo form that uses <strong>Speak</strong>Captcha at the
							end.
						</p>
						<form
							action="/api/basic"
							method="POST"
							onSubmit={e => {
								if (!isCaptchaSolved || !captchaId || !processToken) {
									alert("Solve the captcha first!")
									e.preventDefault()
								}
							}}
						>
							<div className="mb-4">
								<label
									className="mb-2 block text-sm font-bold text-gray-700"
									htmlFor="name"
								>
									Name
								</label>
								<input
									className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
									required
									id="name"
									name="name"
									type="text"
									placeholder="John Doe"
								/>
							</div>
							<div className="mb-4">
								<label
									className="mb-2 block text-sm font-bold text-gray-700"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
									id="email"
									name="email"
									required
									type="email"
									placeholder="john@doe.com"
								/>
							</div>
							<div className="mb-4">
								<label
									className="mb-2 block text-sm font-bold text-gray-700"
									htmlFor="terms"
								>
									<input
										className="mr-2 leading-tight"
										type="checkbox"
										name="terms"
										id="terms"
									/>
									I agree to the Terms and Conditions
								</label>
							</div>
							<div className="mb-4">
								<iframe
									src={
										process.env.NEXT_PUBLIC_SPEAKCAPTCHA_URL +
										"/api/captcha?application_id=" +
										process.env.NEXT_PUBLIC_SPEAKCAPTCHA_APP_ID +
										// Add an identifier for your convinience.
										// A SpeakCaptcha will use `window.postMessage` to inform you of solved captchas, so you
										// can add an identifier if you have multiple captchas in one page.
										// You need to prefix it with a `#` over here, but the `#` is not part of the identifier.
										// Meaning if your identifier was `example`, you would write `#example` here.
										"#" +
										CAPTCHA_IDENTIFIER
									}
									allow={`microphone ${process.env.NEXT_PUBLIC_SPEAKCAPTCHA_URL}`}
									className="w-full"
									frameBorder={0}
								></iframe>
							</div>
							{/* Set the process token and captcha id as hidden fields */}
							<input type="hidden" name="process_token" value={processToken} />
							<input type="hidden" name="captcha_id" value={captchaId} />
							<div className="mb-4">
								<button
									className="focus:shadow-outline mr-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
									disabled={!isCaptchaSolved}
									type="submit"
								>
									Join the NewsLetter
								</button>
								<Link href="/">
									<a className="rounded border border-gray-500 bg-white px-4 py-2 text-blue-500">
										Homepage
									</a>
								</Link>
							</div>
							{isCaptchaSolved && (
								<p className="my-4 text-green-500">You solved the captcha correctly!</p>
							)}
							{isCaptchaInvalid && (
								<p className="my-4 text-red-500">The captcha is incorrect!</p>
							)}
							<p className="my-4 text-sm text-gray-500">
								(This is a demo form, none of your input is stored anywhere)
							</p>
						</form>
					</>
				) : (
					<>
						<p className="my-4 text-green-500">
							Success! You have completed the demo. Don't worry, you haven't signed up
							for any newsletter, your input has been discarded.
						</p>
						<p className="my-4 flex items-center gap-2">
							<Link href="/">
								<a className="rounded border border-transparent bg-blue-500 px-4 py-2 text-white">
									Homepage
								</a>
							</Link>
							<button
								onClick={() => setSuccess(false)}
								className="rounded border border-gray-500 bg-white px-4 py-2 text-blue-500"
							>
								Do it again
							</button>
						</p>
					</>
				)}
			</div>
		</>
	)
}

export default WithEvents
