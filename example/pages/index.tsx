import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const Index: NextPage = () => {
	return (
		<>
			<Head>
				<title>SpeakCaptcha Demo</title>
			</Head>
			<div className="mx-auto mt-12 max-w-screen-md p-12">
				<h1 className="my-4 text-center text-5xl font-bold">
					<strong className="font-black">Speak</strong>Captcha Demo
				</h1>
				<p className="mt-8 text-center text-xl">
					Demos that show you how you can use SpeakCaptcha in your application.
				</p>

				<div className="mt-12 flex flex-col items-center justify-center gap-4">
					<Link href="/basic">
						<a className="text-lg text-blue-500">Basic demo</a>
					</Link>
					<span className="text-lg text-gray-500">More coming soon...</span>
				</div>

				<p className="mt-24 text-center text-gray-500">
					Both ways are perfectly fine to use. For more info, read the{" "}
					<a
						className="text-blue-500 underline"
						href={`${process.env.NEXT_PUBLIC_SPEAKCAPTCHA_URL}/developers/docs`}
					>
						documentation
					</a>
					.
				</p>
			</div>
		</>
	)
}

export default Index
