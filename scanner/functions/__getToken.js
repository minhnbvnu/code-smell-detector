function __getToken(ctx) {
  // only valid for the top ctx
  if (ctx.ctxCaller) return null;
  // 1. check header
  let token;
  if (ctx.get('authorization')) {
    const parts = ctx.get('authorization').split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
  }
  if (token) return token;

  // 2. check query
  token = ctx.query['eb-jwt'];
  if (token) return token;

  // not found
  return null;
}