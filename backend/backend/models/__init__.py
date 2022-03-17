import inspect

from pydantic import BaseModel

from backend.lib.mongo import db


def get_implementation(cls, _id: str, collection: str) -> dict | None:
    item = db[collection].find_one({"_id": _id})
    if not item:
        return None
    else:
        return cls(id=item["_id"], **item)


class Model(BaseModel):
    id: str
    COLLECTION_NAME: str

    @classmethod
    def get(cls, _id: str):
        return None

    def save(self):
        to_update = self.dict(exclude={"id", "COLLECTION_NAME"})
        db[self.COLLECTION_NAME].update_one({"_id": self.id}, {"$set": {**to_update, "_id": self.id}}, upsert=True)

    def delete(self):
        db[self.COLLECTION_NAME].delete_one({"_id": self.id})
