function validateKey(key) {
  if (key === null || key === void 0) {
    throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?");
  }
}