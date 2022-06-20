# [SpeakCaptcha](https://speakcaptcha.tk) -- The Captcha that makes you speak out the answer

The source code for [SpeakCaptcha](https://speakcaptcha.tk).

Checkout the [documentation](https://speakcaptcha.tk/documentation) for instructions on how to use SpeakCaptcha.

## Local development

First clone this repository and ensure that you have NodeJS with Yarn and Python with Poetry installed.

### Frontend

1. `cd` to the `frontend` folder.
2. run `yarn install` to install necessary packages.
3. add this to the `.env` file:
```
VITE_SPEAKCAPTCHA_APP_ID=<your-speakcaptcha-app's-id>
```
This is used in the documentation and is *optional*.
4. you can either run the app here with `yarn dev` or build it with `yarn build` and copy over the `dist` folder to the backend.

### Backend

You will need:
1. A deepgram account
2. A github account with a github oauth app created already
3. A locally hosted / cloud hosted mongodb database

1. Make sure you've setup frontend up until step `3` first.
2. `cd` into the `backend` folder.
3. run `poetry install` to install python deps and `yarn install` to install gulp deps.
4. build the frontend by `cd`ing to the `frontend` folder and running `yarn build`.
5. copy the `dist` folder to the root of the `backend` folder.
6. create a `.env` file with this content:
```
# for github oauth
GITHUB_CLIENT_ID=client-id-of-github-app
GITHUB_CLIENT_SECRET=client-secret-of-github-app

MONGODB_URI=uri-of-mongodb

# for deepgram - be sure to create an api key
DEEPGRAM_KEY_ID=api-key-id
DEEPGRAM_KEY_SECRET=api-key-secret
```
7. run the app with `yarn dev`.

### Example

Example is hosted live at <https://examples.speakcaptcha.tk>.

1. `cd` into the `example` folder.
2. run `yarn install` to install packages.
3. create a `.env.local` file and add this to it.
```
NEXT_PUBLIC_SPEAKCAPTCHA_URL=url-to-speakcaptcha (optional, in case you've hosted speakcaptcha yourself)
NEXT_PUBLIC_SPEAKCAPTCHA_APP_ID=id-of-the-speakcaptcha-app
SPEAKCAPTCHA_SECRET=secret-of-the-speakcaptcha-app
```
4. run the app with `yarn dev`.

## Using docker

You can use docker instead, by building the docker file using `docker build -t speakcaptcha .`, and running it with `docker run -dp 5000:5000 -e ENV_VARS speakcaptcha`.

Be sure to add all the environment variables from step 6 of the backend setup process in the command.
