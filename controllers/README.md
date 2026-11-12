# Controllers

The controllers implement the HTTP behavior for the API. Route registration is
in [`../routes/index.js`](../routes/index.js); controller methods are linked
below.

## Tasks

- **Service health and aggregate counts** - `GET /status` reports Redis and
  MongoDB connectivity; `GET /stats` reports user and file counts.
  Implemented in [AppController.js](./AppController.js).
- **User registration and current-user lookup** - `POST /users` creates a user
  with a SHA-1 password hash, and `GET /users/me` returns the authenticated
  user's public profile.
  Implemented in [UsersController.js](./UsersController.js).
- **Token authentication** - `GET /connect` validates Basic credentials and
  creates a 24-hour Redis token; `GET /disconnect` removes the token.
  Implemented in [AuthController.js](./AuthController.js).
- **File and folder management** - `POST /files` uploads content or creates a
  folder; `GET /files` lists files by parent folder with pagination; `GET /files/:id` retrieves
  file metadata; publish/unpublish endpoints change visibility; and
  `GET /files/:id/data` serves file content when access is allowed.
  Implemented in [FilesController.js](./FilesController.js), with shared file
  operations in [`../utils/file.js`](../utils/file.js).

## Files

| File | Responsibility |
| --- | --- |
| [AppController.js](./AppController.js) | Health and statistics endpoints. |
| [AuthController.js](./AuthController.js) | Sign-in and sign-out. |
| [FilesController.js](./FilesController.js) | File upload, metadata, listing, visibility, and content endpoints. |
| [UsersController.js](./UsersController.js) | User registration and current-user endpoint. |
