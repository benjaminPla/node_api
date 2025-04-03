# WIP

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

this is a todo list in readme, it's not ok to put it here but it's only for me, it will be updated in the future

- saml, oauth
- docker
  <!-- - roles -->
  <!-- - rate limiter + slown down -->
  <!-- - middlewares -->
<!-- - cache -->
<!-- - fk -->
- soft delete
<!-- - jwt -->
- test
- refresh token
- sessionId
<!-- - role middleware -->
- modulize helpers
