import os
from pprint import pprint

from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse

from backend.dependencies.user import use_user
from backend.lib.auth import GithubOAuth
from backend.lib.mongo import db
from backend.models.user import User, UserResponse
from backend.models.application import Application, COLLECTION_NAME as APPLICATION_COLLECTION_NAME, \
    ApplicationRequest, ApplicationResponse
from backend.lib.util import HTTPError

router = APIRouter()


# AUTH

@router.get("/github/connect")
def github_connect():
    return RedirectResponse(GithubOAuth.get_connect_url())


@router.get("/github/callback")
def github_callback(state: str, code: str, request: Request):
    session = request.session
    frontend_url = os.getenv("FRONTEND_URL") or ""

    if not GithubOAuth.verify_state(state):
        raise HTTPError("Invalid state")

    token = GithubOAuth.get_access_token(code)
    github_user = GithubOAuth.get_github_user(token)

    user = User(id=github_user["id"], username=github_user["login"],
                email=github_user["email"], github_data=github_user)

    pprint(user.dict())

    user.save()

    session["user_id"] = user.id

    return RedirectResponse(frontend_url + "/developers")


# Only uncomment for development
# Used to set a user session without having to log in via GitHub.

# @router.get("/dev")
# def set_developer_session(request: Request):
#     request.session["user_id"] = os.getenv("DEVELOPER_USER_ID", "52203828")
#     return {}


@router.get("/me")
def get_current_user(user: User = Depends(use_user())):
    return UserResponse(**user.dict())


@router.get("/logout")
def logout_user(request: Request, should_redirect: str = ""):
    session = request.session
    del session["user_id"]
    if should_redirect:
        frontend_url = os.getenv("FRONTEND_URL") or ""
        return RedirectResponse(frontend_url + "/developers")
    else:
        return {"message": "Logged out", "ok": True}


# APPLICATIONS

@router.get("/applications")
def get_applications(user: User = Depends(use_user())):
    applications_mdb = list(db[APPLICATION_COLLECTION_NAME].find({"owner_id": user.id}).sort("created_at", -1))
    applications = [Application(**app, id=app.get("_id")) for app in applications_mdb]

    return {"applications": [ApplicationResponse(**app.dict()) for app in applications]}


@router.get("/applications/{application_id}")
def get_application(application_id: str):
    app, owner = Application.get(application_id)
    if app is None:
        raise HTTPError("Application not found", "Application not found", 404)
    return {"application": ApplicationResponse(**app.dict(), owner=UserResponse(**owner.dict()))}


@router.post("/applications")
def create_application(body: ApplicationRequest, user: User = Depends(use_user())):
    app, secret = body.create_app(user)
    app.save()
    return {"application": ApplicationResponse(**app.dict(), owner=user), "secret": secret}


@router.put("/applications/{application_id}")
def create_application(application_id: str, body: ApplicationRequest, user: User = Depends(use_user())):
    app = Application.get(application_id)[0]
    if app is None:
        raise HTTPError("Application not found", "Application not found", 404)
    if app.owner_id != user.id:
        raise HTTPError("You are not authorized to update this application", "Not authorized", 403)
    app.name = body.name
    app.save()
    return {"application": ApplicationResponse(**app.dict(), owner=user)}


@router.put("/applications/{application_id}/secret")
def rotate_application_secret(application_id: str, user: User = Depends(use_user())):
    app = Application.get(application_id)[0]
    if app is None:
        raise HTTPError("Application not found", "Application not found", 404)
    if app.owner_id != user.id:
        raise HTTPError("You are not authorized to update this application", "Not authorized", 403)
    secret = app.rotate_secret()
    return {"application": ApplicationResponse(**app.dict(), owner=user), "secret": secret}


@router.delete("/applications/{application_id}")
def delete_application(application_id: str, user: User = Depends(use_user())):
    app = Application.get(application_id)[0]
    if app is None:
        raise HTTPError("Application not found", "Application not found", 404)
    if app.owner_id != user.id:
        raise HTTPError("You are not authorized to update this application", "Not authorized", 403)
    app.delete()
    return {"application": ApplicationResponse(**app.dict(), owner=user)}
