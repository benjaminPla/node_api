# rindus

## Overview

This API is built with Node.js, Express, PostgreSQL, Sequelize, and Redis. It includes:

- User management with roles (admin, client).
- Authentication via JWT and bcrypt for password hashing.
- Rate limiting and basic security measures to mitigate bot attacks.
- Fully documented and tested using Postman.
- Dockerized with Docker and Docker Compose, ready to run with PostgreSQL and Redis containers.

Aimed to showcase my skills with minimal code (limited time!).

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

### docker

wip

### local

1. clone the repo
2. `npm run build`
3. `npm run start`
4. test the api using any http client, follow postman documentation

# notes

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
- [ ] jwt
- [ ] test
- [ ] refresh token
- [ ] sessionId
- [x] role middleware
- [ ] modularize helpers
