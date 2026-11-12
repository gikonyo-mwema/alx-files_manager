# Tests

The tests use Mocha, Chai, and Chai HTTP. They expect the application
dependencies and running Redis and MongoDB services.

## Test tasks

- [0-redisAndMongo.test.js](./0-redisAndMongo.test.js) - check Redis and
  MongoDB client health, Redis key operations/expiry, and document counts.
- [1-apps.test.js](./1-apps.test.js) - exercise `GET /status` and `GET /stats`.
- [2-user.test.js](./2-user.test.js) - exercise user creation, duplicate and
  missing-field errors, sign-in/sign-out, and `GET /users/me`.
- [3-file.test.js](./3-file.test.js) - currently contains another copy of user
  endpoint tests, despite the filename. It does not currently test file
  endpoints.

Run the suite from the repository root with `yarn test`.
