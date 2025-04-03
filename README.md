# rindus

## Overview

this api is built with node.js, express, postgresql, sequelize, and redis. it includes:

- user management with roles (admin, client).
- authentication via jwt and bcrypt for password hashing.
- rate limiting and basic security measures to mitigate bot attacks.
- fully documented and tested using postman.
- dockerized with docker and docker compose, ready to run with postgresql and redis containers.

aimed to showcase my skills with minimal code (limited time!).

## structure

```
.
├── build
│   └── src
│       ├── controllers
│       │   ├── health.js
│       │   └── user
│       │       ├── create.js
│       │       └── get.js
│       ├── helpers
│       │   └── index.js
│       ├── index.js
│       └── routes
│           └── index.js
├── package.json
├── package-lock.json
├── posts.sql
├── README.md
├── src
│   ├── controllers
│   │   ├── authentication
│   │   │   └── authenticate.ts
│   │   ├── health.ts
│   │   ├── post
│   │   │   └── get.ts
│   │   └── user
│   │       ├── create.ts
│   │       └── get.ts
│   ├── extended.d.ts
│   ├── helpers
│   │   ├── index.ts
│   │   └── syncAndPopulateDb.ts
│   ├── index.ts
│   ├── middlewares
│   │   ├── authenticateToken.ts
│   │   ├── checkAdmin.ts
│   │   └── checkReq.ts
│   ├── models
│   │   ├── post.ts
│   │   └── user.ts
│   └── routes
│       └── index.ts
└── tsconfig.json
```

## how to run it

to get started, you'll need to set up a .env file for environment variables. here’s an example of what your .env file should look like (feel free to customize it):

```
ADMIN_EMAIL=rindus@email.com
ADMIN_PASSWORD=rindus12345
BCRYPT_SALT=10
DB_HOST=localhost
DB_NAME=rindus
DB_PASSWORD=rindus12345
DB_PORT=5432
DB_USERNAME=rindus
ENV='dev'
JWT_EXPIRES_MS=900000
JWT_SECRET=rindus12345
PORT=3000
RATE_LIMITER_MAX=10
RATE_LIMITER_WINDOW_MS=900000
REDIS_EX_S=60
SPEED_LIMITER_DELAY_AFTER=5
SPEED_LIMITER_DELAY_MS=100
SPEED_LIMITER_WINDOW_MS=900000
```

### docker

wip

### local

1. clone the repo
2. `npm run build`
3. `npm run start`
4. test the api using any http client, follow postman documentation

# notes

remove syncDB (edge case where empty db and break fk)

```
docker run -d \
  --name postgres-rindus \
  -e POSTGRES_USER=rindus \
  -e POSTGRES_PASSWORD=rindus12345 \
  -e POSTGRES_DB=rindus \
  -p 5432:5432 \
  postgres


  docker run -d --name redis -p 6379:6379 redis
```

## todo

- [ ] saml || oauth
- [ ] docker
- [x] roles
- [x] rate limiter + slow down
- [x] middlewares
- [x] cache
- [x] fk
- [ ] soft delete
- [x] jwt
- [ ] test
- [ ] refresh token
- [ ] sessionId
- [x] role middleware
- [ ] modularize helpers
- [ ] sequelize pool
- [x] optimistic locking
