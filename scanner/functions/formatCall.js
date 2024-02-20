function formatCall({ method, path, payload }) {
  return `${method} ${path} ${payload || ""}`;
}