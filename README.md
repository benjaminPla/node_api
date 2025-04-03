# rindus

## overview

this api is built with node.js, express, postgresql, sequelize, and redis. it includes:

- user management with roles (admin, client).
- authentication via jwt and bcrypt for password hashing.
- crud operations
- rate limiting and basic security measures to mitigate bot attacks.
- fully documented and tested using postman.
- dockerized with docker and docker compose, ready to run with postgresql and redis containers.

aimed to showcase my skills with minimal code (limited time!).

## documentation

https://documenter.getpostman.com/view/16085603/2sB2cSiQ4r

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
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controllers
│   │   ├── authentication
│   │   │   └── authenticate.ts
│   │   ├── health.ts
│   │   ├── post
│   │   │   ├── delete.ts
│   │   │   ├── get.ts
│   │   │   ├── post.ts
│   │   │   └── put.ts
│   │   ├── syncDb.ts
│   │   └── user
│   │       ├── create.ts
│   │       └── get.ts
│   ├── extended.d.ts
│   ├── helpers
│   │   └── index.ts
│   ├── index.ts
│   ├── middlewares
│   │   ├── authenticateToken.ts
│   │   ├── checkAdmin.ts
│   │   ├── checkReq.ts
│   │   └── checkValidId.ts
│   ├── models
│   │   ├── post.ts
│   │   └── user.ts
│   └── routes
│       └── index.ts
└── tsconfig.json
```

## how to run it

### local

1. clone the repo
2. add an _.env_ file

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
RATE_LIMITER_MAX=30
RATE_LIMITER_WINDOW_MS=900000
REDIS_EX_S=30
REDIS_URL=redis://localhost:6379
SPEED_LIMITER_DELAY_AFTER=5
SPEED_LIMITER_DELAY_MS=100
SPEED_LIMITER_WINDOW_MS=900000
```

3. you would need a postgres and a redis client running on your pc, you can run:

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

4. run `npm run build && npm run start`
5. call the api with any http client following the documentation

### docker

1. run `docker-compose run`
2. sync and populate the db hitting one `syncDb` enpoint, this will create an admin user accoding the _.env_ vars _(this is a bad practice and of course unsecured but I had no more time really)_
3. call the api with any http client following the documentation

## todo

- [ ] saml || oauth
- [x] docker
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
- [ ] sequelize pool
- [x] optimistic locking
- [x] documentation

```

```
