# 0x04. Files manager

A Node.js/Express file-management API backed by MongoDB and Redis. It supports
user registration and token authentication, file and folder storage, public
file access, and background jobs for user notifications and image thumbnails.

## Repository map

| Directory | What it contains |
| --- | --- |
| [controllers/](./controllers/README.md) | Request handlers for status, statistics, users, authentication, and files. |
| [routes/](./routes/README.md) | Express route definitions connecting API endpoints to controllers. |
| [tests/](./tests/README.md) | Mocha/Chai tests for service clients, application endpoints, and users. |
| [utils/](./utils/README.md) | Redis, MongoDB, user, file, and ID utility modules. |

## Tasks and implementation

### Application and API

- **Start the API and mount the routes:** [server.js](./server.js) and
  [routes/index.js](./routes/index.js).
- **Check service health and database totals:** `GET /status` and `GET /stats`
  in [AppController.js](./controllers/AppController.js).
- **Register users and retrieve the authenticated user:** `POST /users` and
  `GET /users/me` in [UsersController.js](./controllers/UsersController.js).
- **Sign in and sign out:** `GET /connect` and `GET /disconnect` in
  [AuthController.js](./controllers/AuthController.js).
- **Create, list, retrieve, publish, and read files:** file endpoints in
  [FilesController.js](./controllers/FilesController.js). File validation,
  persistence, ownership, and local content access are supported by
  [file.js](./utils/file.js).

### Background processing

- **Welcome newly created users and generate image thumbnails:** queue workers
  in [worker.js](./worker.js).
- **Validate MongoDB IDs:** [basic.js](./utils/basic.js).
- **Resolve users and their Redis authentication tokens:**
  [user.js](./utils/user.js).

### Tests

- **Redis and MongoDB client behavior:** [0-redisAndMongo.test.js](./tests/0-redisAndMongo.test.js).
- **Health and statistics endpoints:** [1-apps.test.js](./tests/1-apps.test.js).
- **User creation and authentication endpoints:** [2-user.test.js](./tests/2-user.test.js).
- **Additional user endpoint tests:** [3-file.test.js](./tests/3-file.test.js).
  Despite its filename, this file currently contains user tests; it does not
  currently exercise the file endpoints.

For file-by-file task details, see the README in each directory linked above.

## Running

Install dependencies with `yarn install`. The API expects MongoDB and Redis to
be available. Their default connection settings are used unless overridden by
`DB_HOST`, `DB_PORT`, and `DB_DATABASE` for MongoDB; uploaded content is stored
under `/tmp/files_manager` unless `FOLDER_PATH` is set.

- Start the API: `yarn start-server`
- Start background workers: `yarn start-worker`
- Run tests: `yarn test`
