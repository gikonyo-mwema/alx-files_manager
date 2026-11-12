# Routes

## Task

Register the API endpoints on an Express router and forward requests to their
controller methods. The router is mounted by [`../server.js`](../server.js).

## Endpoints

| Method | Path | Task |
| --- | --- | --- |
| `GET` | `/status` | Report Redis and MongoDB health. |
| `GET` | `/stats` | Report the number of users and files. |
| `POST` | `/users` | Create a user. |
| `GET` | `/users/me` | Retrieve the authenticated user's profile. |
| `GET` | `/connect` | Sign in and issue an authentication token. |
| `GET` | `/disconnect` | Sign out and remove the authentication token. |
| `POST` | `/files` | Upload a file or create a folder. |
| `GET` | `/files/:id` | Retrieve file metadata. |
| `GET` | `/files` | List a page of files, optionally under a parent folder. |
| `PUT` | `/files/:id/publish` | Make a file public. |
| `PUT` | `/files/:id/unpublish` | Make a file private. |
| `GET` | `/files/:id/data` | Retrieve file contents. |

Definitions and controller wiring are in [index.js](./index.js).
