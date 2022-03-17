from typing import Optional
from fastapi.responses import JSONResponse


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
