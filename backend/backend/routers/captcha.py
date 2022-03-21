from base64 import b64encode
from captcha.image import ImageCaptcha
from fastapi import APIRouter, Query, Request
from nanoid import generate as nanoid
from math import floor
from time import time

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
        "solved": False
    }
    captcha = b64encode(ImageCaptcha().generate(captcha_solution).getvalue()).decode("utf-8")
    print("a", captchas)
    return jinja.TemplateResponse("captcha.html", dict(captcha=captcha, captcha_id=captcha_id, request=request))
