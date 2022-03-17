import os

from pymongo import MongoClient

mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))

db = mongo["speakcaptcha"]
