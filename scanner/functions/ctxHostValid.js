function ctxHostValid(ctx) {
  // not check localhost, because almost inner api call use 127.0.0.1
  return (
    !ctx.innerAccess &&
    ctx.host &&
    ctx.protocol &&
    ctx.host.indexOf('127.0.0.1') === -1 &&
    // ctx.host.indexOf('localhost') === -1 &&
    ['http', 'https'].includes(ctx.protocol)
  );
}