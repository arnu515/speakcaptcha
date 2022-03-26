from typing import Optional
from fastapi import Header
from fastapi.responses import JSONResponse
from base64 import b64decode


class HTTPError(Exception):
    def __init__(self, message: str, name="Invalid request", status_code: int = 400,
                 headers: Optional[dict] = None, data: Optional[dict] = None):
        self.message = message
        self.name = name
        self.status_code = status_code
        self.headers = headers or dict()
        self.data = data or dict()

    def handler(self):
        return JSONResponse(dict(
            error=self.name,
            error_description=self.message,
            status=self.status_code,
            ok=False,
            **self.data
        ), status_code=self.status_code, headers=self.headers)


def parse_basic_auth_header(header: Optional[str]) -> Optional[dict]:
    if not header:
        return None
    if header.startswith("Basic "):
        header = header.replace("Basic ", "")
    else:
        return None
    try:
        username, password = b64decode(header).decode("utf-8").split(":")
        return dict(username=username, password=password)
    except ValueError:
        return None


def parse_basic_auth_header_depend(authorization: Header(None)) -> Optional[dict]:
    return parse_basic_auth_header(authorization)
