function __combineJwtTokens(app, options, token) {
  app.config.jwt;
  // accessToken
  const accessToken = __combineJwtToken(app, options, token, 'accessToken');
  // refreshToken
  const refreshToken = __combineJwtToken(app, options, token, 'refreshToken');
  return {
    accessToken,
    expireTime: Date.now() + app.config.jwt.oauth.accessToken.maxAge,
    refreshToken,
  };
}