import os

import uvicorn

if __name__ == '__main__':
    print(os.getenv("PORT"), os.getenv("DEV"))
    port = int(os.getenv("PORT", "5000"))
    dev = bool(int(os.getenv("DEV", "0")))
    uvicorn.run('backend:app', host='0.0.0.0',
                port=port, env_file=".env", reload=dev)
