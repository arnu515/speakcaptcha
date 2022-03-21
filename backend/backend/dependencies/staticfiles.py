from fastapi.staticfiles import StaticFiles
from os import path

static_path = path.abspath(path.join(path.dirname(__file__), "../static"))
static = StaticFiles(directory=static_path)
