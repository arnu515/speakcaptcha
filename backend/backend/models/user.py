from . import Model, get_implementation

from pydantic import BaseModel

COLLECTION_NAME = "users"


class User(Model):
    COLLECTION_NAME = COLLECTION_NAME
    username: str
    email: str
    github_data: dict

    @classmethod
    def get(cls, _id: str):
        return get_implementation(cls, _id, COLLECTION_NAME)


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
