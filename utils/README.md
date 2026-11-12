# Utilities

Shared service clients and helpers used by the
[`../controllers/`](../controllers/README.md) and
[`../worker.js`](../worker.js).

## Tasks

- **MongoDB connection and counts** - connect to the configured database,
  expose collection access through the client, report connection status, and
  count user and file documents. See [db.js](./db.js).
- **Redis token storage** - provide connection status and promise-based get,
  expiring set, and delete operations. See [redis.js](./redis.js).
- **Authentication and user lookup** - read the `X-Token` header, resolve its
  Redis key to a user ID, and fetch a user document. See [user.js](./user.js).
- **File operations** - validate upload metadata and parent folders, save
  file/folder records and local content, list and update records, enforce
  visibility/ownership, and read file bytes. See [file.js](./file.js).
- **MongoDB ID validation** - check whether a supplied ID can be used as a
  MongoDB `ObjectId`. See [basic.js](./basic.js).

## Files

| File | Responsibility |
| --- | --- |
| [basic.js](./basic.js) | Basic MongoDB ID validation. |
| [db.js](./db.js) | MongoDB client and database statistics. |
| [file.js](./file.js) | File and folder validation, storage, access, and updates. |
| [main.js](./main.js) | Small Redis client usage/demo script. |
| [redis.js](./redis.js) | Redis client and key operations. |
| [user.js](./user.js) | User queries and authentication-token resolution. |
