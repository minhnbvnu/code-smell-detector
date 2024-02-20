function __checkIfRefreshToken(app, jwt) {
  return !jwt.exp || jwt.exp - Date.now() > app.config.jwt.oauth.accessToken.maxAge;
}