"""
Captcha Application for using on other websites
"""

from . import Model, db
from .user import User, UserResponse

import math
import time
import nanoid
import hashlib
from pydantic import BaseModel, Field

COLLECTION_NAME = "applications"


class Application(Model):
    COLLECTION_NAME = COLLECTION_NAME
    name: str
    secret: str
    created_at: int
    owner_id: str

    @classmethod
    def get(cls, _id: str):
        item = db[COLLECTION_NAME].find_one({"_id": _id})
        if not item:
            return None, None
        owner = db["users"].find_one({"_id": item["owner_id"]})
        return cls(**item, id=item["_id"]), User(**owner, id=owner["_id"])

    def rotate_secret(self) -> str:
        secret = nanoid.generate(size=64)
        self.secret = hashlib.sha256(secret.encode()).hexdigest()
        self.save()
        return secret

    def check_secret(self, secret: str) -> bool:
        return hashlib.sha256(secret.encode()).hexdigest() == self.secret


class ApplicationRequest(BaseModel):
    name: str = Field(max_length=64, min_length=4)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def create_app(self, user: User) -> tuple[Application, str]:
        secret = nanoid.generate(size=128)
        app = Application(
            id=nanoid.generate(size=64),
            name=self.name,
            secret=hashlib.sha256(secret.encode()).hexdigest(),
            owner_id=user.id,
            created_at=math.floor(time.time())
        )
        return app, secret


class ApplicationResponse(BaseModel):
    id: str
    name: str
    secret: str
    created_at: int
    owner: UserResponse | None
