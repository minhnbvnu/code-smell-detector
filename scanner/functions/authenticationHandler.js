function authenticationHandler() {
  return passport.authenticate(authStrategy, { scope: ["profile", "email"] });
}