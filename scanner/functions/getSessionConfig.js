function getSessionConfig() {
  const cookieSessionKey = process.env.COOKIE_SESSION_SECRET || "matrix-session";
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const maxAge = environment.parseVariable(process.env.COOKIE_SESSION_MAX_AGE)
    || thirtyDays;

  return {
    name: "matrix-session",
    keys: [cookieSessionKey],
    maxAge,
  };
}