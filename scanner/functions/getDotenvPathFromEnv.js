function getDotenvPathFromEnv() {
  if (process.env.TESTING) {
    return ".env.testing";
  } else if (process.env.STAGING) {
    return ".env.staging";
  } else if (process.env.NODE_ENV === "production") {
    return ".env.production";
  }

  return ".env";
}