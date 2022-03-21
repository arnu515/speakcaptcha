import os

from starlette.middleware.sessions import SessionMiddleware

from .app import app
from .dependencies.staticfiles import static
from .lib.util import HTTPError
from .routers.developers import router as developers
from .routers.captcha import router as captcha

app.include_router(developers, prefix='/api/developers')
app.include_router(captcha, prefix='/api/captcha')
app.mount("/", static, name="static")


@app.exception_handler(HTTPError)
async def http_error_handler(_, exc: HTTPError):
    return exc.handler()


app.add_middleware(SessionMiddleware, secret_key=os.getenv("SECRET_KEY", "secret"))
