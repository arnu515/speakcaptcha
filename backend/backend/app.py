from fastapi import FastAPI

from backend.dependencies.servedist import handle_catch_all

app = FastAPI(exception_handlers={
    404: handle_catch_all
})
