import os

import uvicorn

if __name__ == '__main__':
    port = int(os.getenv("PORT", "5000"))
    uvicorn.run('backend:app', host='0.0.0.0', port=port, env_file=".env", reload=True)
