from fastapi.templating import Jinja2Templates
from os import path

jinja = Jinja2Templates(directory=path.join(path.realpath(__file__), "../templates"))
