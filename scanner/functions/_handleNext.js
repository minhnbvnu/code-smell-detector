async function _handleNext(ctx, next) {
    // cookies
    let cookiesRequest;
    let isRefreshToken;
    const useJwt = __checkIfJWT(ctx);
    // set cookie
    if (useJwt) {
      // clear cookie CABLOY_SESS forcely
      cookiesRequest = __parseCookiesRequest(ctx.request.headers.cookie);
      delete cookiesRequest.CABLOY_SESS;
      if (ctx.state.jwt) {
        // check exp
        const isValid = !ctx.state.jwt.exp || ctx.state.jwt.exp > Date.now();
        if (isValid) {
          isRefreshToken = __checkIfRefreshToken(app, ctx.state.jwt);
          // token
          const token = ctx.state.jwt.token;
          const res = ctx.cookies.keys.decrypt(utility.base64decode(token, true, 'buffer'));
          let cookiesJwt = res ? res.value.toString() : undefined;
          if (cookiesJwt) {
            cookiesJwt = __parseCookiesRequest(cookiesJwt);
            cookiesRequest = Object.assign({}, cookiesJwt, cookiesRequest);
          }
        }
      }
      // set cookie
      ctx.request.headers.cookie = __combineCookies(cookiesRequest);
    }
    // next
    await next();
    // check cookie
    if (useJwt && ctx.response.type === 'application/json' && (isRefreshToken || ctx.response.get('set-cookie'))) {
      // parse
      const cookiesNew = __parseCookiesResponse(ctx.response.get('set-cookie'));
      // assign
      Object.assign(cookiesRequest, cookiesNew);
      // combine
      const cookiesRes = __combineCookies(cookiesRequest);
      // jwt
      const token = utility.base64encode(ctx.cookies.keys.encrypt(cookiesRes), true);
      const oauth = __combineJwtTokens(app, options, token);
      if (!ctx.response.body) ctx.response.body = {};
      ctx.response.body['eb-jwt-oauth'] = oauth;
      // clear response header
      ctx.res.removeHeader('set-cookie');
    }
  }