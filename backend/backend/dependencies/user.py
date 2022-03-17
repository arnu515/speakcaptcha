from fastapi import Request

from backend.lib.util import HTTPError
from backend.models.user import User


def use_user(required=True):
    def handler(request: Request):
        session = request.session
        user_id = session.get("user_id")
        if user_id is None:
            if not required:
                return None
            raise HTTPError("Not logged in", "Unauthorized", status_code=401)

        user = User.get(user_id)
        if user is None:
            del session["user_id"]
            if not required:
                return None
            raise HTTPError("User not found", "Unauthorized", status_code=401)

        return user

    return handler
