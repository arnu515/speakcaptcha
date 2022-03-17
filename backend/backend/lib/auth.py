from typing import Optional

import os
import time
import math
from pprint import pprint
from urllib.parse import urlencode

import nanoid
import requests

from backend.lib.mongo import db
from backend.lib.util import HTTPError


class GithubOAuth:
    client_id = os.getenv("GITHUB_CLIENT_ID")
    client_secret = os.getenv("GITHUB_CLIENT_SECRET")

    @staticmethod
    def get_connect_url():
        state = nanoid.generate("abcdefABCDEF0123456789", size=21)
        db["github-auth-states"].insert_one({"_id": state, "expires": math.floor(time.time()) + (60 * 15)})
        return f"https://github.com/login/oauth/authorize?client_id={GithubOAuth.client_id}" \
               f"&state={state}&scope=user:email"

    @staticmethod
    def verify_state(state: Optional[str]):
        if state is None:
            return False
        state_from_db = db["github-auth-states"].find_one({"_id": state})

        if state_from_db is None:
            return False

        if state_from_db["expires"] < math.floor(time.time()):
            db["github-auth-states"].delete_one({"_id": state})
            return False

        if state_from_db["_id"] != state:
            return False

        db["github-auth-states"].delete_one({"_id": state})
        return True

    @staticmethod
    def get_access_token(code: str):
        response = requests.post(
            "https://github.com/login/oauth/access_token?" +
            urlencode(dict(client_id=GithubOAuth.client_id, client_secret=GithubOAuth.client_secret, code=code)),
            headers={"Accept": "application/json"}
        )
        data = response.json()
        pprint(data)

        if "error" in data:
            raise HTTPError(data["error_description"] or data["error"], data["error"], response.status_code)

        scope: str = data.get("scope", "")
        if type(scope) != str:
            raise HTTPError("Invalid scope. Please try again.")
        if "user:email" not in scope:
            raise HTTPError("Invalid scope. Please try again")

        token: str = data.get("access_token", "")
        if type(token) != str:
            raise HTTPError("Invalid token. Please try again.")

        return token

    @staticmethod
    def get_github_user_email(token: str):
        email_response = requests.get("https://api.github.com/user/emails", headers={"Authorization": f"token {token}"})
        email_data = email_response.json()
        pprint(email_data)
        if email_response.status_code != 200:
            raise HTTPError(email_data["message"] or email_data["error"],
                            email_data["error"] or "Failed to get GitHub user", email_response.status_code)
        for email in email_data:
            if email["primary"] and email["verified"]:
                return email["email"]
        raise HTTPError("Please make sure you have a primary verified email on your GitHub account.",
                        "No verified email found")

    @staticmethod
    def get_github_user(token: str):
        user_response = requests.get("https://api.github.com/user", headers={"Authorization": f"token {token}"})
        user_data = user_response.json()
        pprint(user_data)
        if user_response.status_code != 200:
            raise HTTPError(user_data["message"] or user_data["error"],
                            user_data["error"] or "Failed to get GitHub user", user_response.status_code)

        if not user_data.get("email"):
            user_data["email"] = GithubOAuth.get_github_user_email(token)

        return user_data
