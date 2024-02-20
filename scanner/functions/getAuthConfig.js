function getAuthConfig() {
  const defaultAuthStrategy = "google";
  const clientID = process.env.GOOGLE_CLIENT_ID || "XXXX";
  const clientSecret = process.env.GOOGLE_SECRET || "XXXX";
  const callbackURL = process.env.GOOGLE_CALLBACK_URL
    || "http://localhost:8080/auth/google/callback";

  return {
    authStrategy: defaultAuthStrategy,
    clientID,
    clientSecret,
    callbackURL,
  };
}