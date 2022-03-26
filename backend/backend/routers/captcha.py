import os
from base64 import b64encode
from captcha.image import ImageCaptcha
from fastapi import APIRouter, Query, Request
from nanoid import generate as nanoid
from math import floor
from time import time
from requests import post

from backend.dependencies.jinja2 import jinja
from backend.lib.util import HTTPError
from backend.models.application import Application

router = APIRouter()

# Store captchas in memory because 😎
captchas = {}


@router.get("")
def generate_captcha(request: Request, application_id: str = Query(...), from_id: str = Query(None)):
    print("b", captchas)
    app, owner = Application.get(application_id)
    if app is None:
        raise HTTPError("Application not found", "Application not found", 404)
    if from_id:
        if from_id in captchas:
            del captchas[from_id]
    captcha_id = nanoid(alphabet="abcdefghijklmnopqrstuvwxyz0123456789_", size=64)
    captcha_solution = nanoid(alphabet="0123456789", size=6)
    captcha_created_at = floor(time())
    captchas[captcha_id] = {
        "solution": captcha_solution,
        "created_at": captcha_created_at,
        "process_token": None,
        "solved": False
    }
    captcha = b64encode(ImageCaptcha().generate(captcha_solution).getvalue()).decode("utf-8")
    print("a", captchas)
    return jinja.TemplateResponse("captcha.html", dict(captcha=captcha, captcha_id=captcha_id, request=request))


@router.post("/process")
async def process_captcha_answer(request: Request, captcha_id: str = Query(...)):
    if captcha_id not in captchas:
        raise HTTPError("Captcha not found", "Captcha not found", 404)

    captcha = captchas[captcha_id]
    if captcha["solved"]:
        raise HTTPError("Captcha already solved", "Captcha already solved", 400)

    # get raw request body
    body = await request.body()
    if body is None:
        raise HTTPError("No body", "No body", 400)
    if not ((request.headers.get("content-type") or "").startswith("audio")):
        raise HTTPError("Please send a .webm file as the body", "Invalid body", 422)

    # get captcha transcript from deepgram
    res = post("https://api.deepgram.com/v1/listen?language=en_US", data=body,
               headers={"Authorization": "Token " + os.getenv("DEEPGRAM_KEY_SECRET"), "Content-Type": "audio/webm",
                        "Accept": "application/json"})
    print(res.content)
    data = res.json()
    if res.status_code != 200:
        print(data, res.status_code)
        raise HTTPError("An error occured while processing your words", "Deepgram API error", 500)

    try:
        transcript = data["results"]["channels"][0]["alternatives"][0]["transcript"]
    except (ValueError, IndexError, KeyError):
        raise HTTPError("Could not get transcript", "Deepgram API error", 500)

    numbers_to_names_map = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }

    # convert names to numbers in transcript
    for name, number in numbers_to_names_map.items():
        transcript = transcript.replace(name, number)

    # make sure transcript is only numbers
    transcript = transcript.replace(" ", "")
    print(transcript)
    if not all(c.isdigit() for c in transcript):
        raise HTTPError("Please speak out the numbers one-by-one. Don't include any other words.", "Invalid captcha",
                        422, data=dict(transcript=transcript))

    # check that captcha is correct
    if captcha["solution"] != transcript:
        raise HTTPError("You may have incorrectly spoken out the numbers. Please try again.", "Invalid captcha", 422,
                        data=dict(transcript=transcript))

    # create a process token and store it in the captcha
    captcha["process_token"] = nanoid("abcdef0123456789", 32)
    print(captchas)

    return dict(transcript=transcript, process_token=captcha["process_token"])
