function isTokenStillValid(token) {
  return Date.now() < token.expiration;
}