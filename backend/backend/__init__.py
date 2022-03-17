import os

from starlette.middleware.sessions import SessionMiddleware

from .app import app
from .lib.util import HTTPError
from .routers.developers import router as developers

app.include_router(developers, prefix='/api/developers')


@app.exception_handler(HTTPError)
async def http_error_handler(_, exc: HTTPError):
    return exc.handler()


app.add_middleware(SessionMiddleware, secret_key=os.getenv("SECRET_KEY", "secret"))
