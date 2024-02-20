function __combineJwtToken(app, options, token, key) {
  const payload = {
    token,
    exp: Date.now() + app.config.jwt.oauth[key].maxAge,
  };
  return jsonwebtoken.sign(payload, options.secret);
}