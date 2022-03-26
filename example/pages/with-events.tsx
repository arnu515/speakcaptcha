import type { NextPage } from "next"
import Head from "next/head"

const WithEvents: NextPage = () => {
	return (
		<>
			<Head>
				<title>SpeakCaptcha Demo: With Events</title>
			</Head>
			<div className="p-4">
				<h1 className="my-4 text-4xl">Demo form</h1>
				<p className="my-4 text-xl">
					Here's a simple demo form that uses <strong>Speak</strong>Captcha at the end.
				</p>
				<form action="/api/with-events" method="POST">
					<div className="mb-4">
						<label
							className="mb-2 block text-sm font-bold text-gray-700"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
								process.env.NEXT_PUBLIC_SPEAKCAPTCHA_APP_ID
							}
							allow={`microphone ${process.env.NEXT_PUBLIC_SPEAKCAPTCHA_URL}`}
							className="w-full"
							frameBorder={0}
						></iframe>
					</div>
					<div className="mb-4">
						<button
							className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
							type="submit"
						>
							Join the NewsLetter
						</button>
					</div>
					<p className="my-4 text-sm text-gray-500">
						(This is a demo form, none of your input is stored anywhere)
					</p>
				</form>
			</div>
		</>
	)
}

export default WithEvents
