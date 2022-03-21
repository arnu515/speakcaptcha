from fastapi.templating import Jinja2Templates
from os import path

template_path = path.abspath(path.join(path.dirname(__file__), "../templates"))
jinja = Jinja2Templates(directory=template_path)
