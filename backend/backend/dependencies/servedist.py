from os import path

from fastapi.exceptions import HTTPException
from fastapi.responses import HTMLResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request

dist_path = path.abspath(path.join(path.dirname(__file__), "../../dist"))
serve = StaticFiles(directory=dist_path)


async def handle_catch_all(req: Request, e: HTTPException) -> Response:
    if req.url.path.startswith("/api"):
        return JSONResponse({"detail": e.detail}, 404, getattr(e, "headers", None))
    with open(path.join(dist_path, "index.html")) as f:
        return HTMLResponse(f.read())
