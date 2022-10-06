# Build the frontend

FROM node:16-alpine AS frontend-builder

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY frontend/package.json .
COPY frontend/yarn.lock .

RUN yarn

COPY frontend .

RUN yarn build

# Build backend assets
FROM node:16-alpine AS backend-assets-builder

RUN mkdir -p /app/backend-assets

WORKDIR /app/backend-assets

COPY backend/package.json .
COPY backend/yarn.lock .

RUN yarn

COPY backend .

RUN yarn gulp

# Build the backend

FROM python:3.10-slim as backend-builder

RUN mkdir -p /app/backend

WORKDIR /app/backend

ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

# install necessary packages
RUN apt-get update && apt-get install curl build-essential -y

# install poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
  cd /usr/local/bin && \
  ln -s /opt/poetry/bin/poetry

# create python virtual env
RUN python -m venv /venv

COPY backend/pyproject.toml .
COPY backend/poetry.lock .

RUN poetry export -f requirements.txt | /venv/bin/pip install -r /dev/stdin

COPY backend .
COPY --from=backend-assets-builder /app/backend-assets/backend/static backend/static

COPY --from=frontend-builder /app/frontend/dist dist

RUN poetry build && /venv/bin/pip install dist/*.whl

# Run the app

FROM python:3.10-slim AS run

RUN mkdir -p /run

WORKDIR /run

COPY --from=backend-builder /venv /venv
COPY --from=backend-builder /app/backend/dist /venv/lib/python3.10/site-packages/dist
COPY --from=backend-builder /app/backend/main.py main.py

ENV DEV 0

ENTRYPOINT ["/venv/bin/python3", "main.py"]
