# Lib Notes

Importance
- `lib` is the shared, framework-agnostic layer.
- It keeps APIs, constants, and helpers in one place.
- Pages and hooks import from `lib` to avoid duplication.

Major concepts covered here
- Centralized API client (`api.ts`) with typed responses.
- Single source of truth for API base URLs (`constants.ts`).
- Route helpers to keep URLs consistent (`routes.ts`).
