function delegateProperties(ctx, ctxCaller) {
  const req = ctx.req;
  for (const property of ['cookies', 'session', 'user', 'state']) {
    delegateProperty(ctx, ctxCaller, property);
  }
  for (const property of ['query', 'params', 'headers', 'body']) {
    delegateProperty(ctx.request, ctxCaller.request, property);
    if (ctx.request[property]) req[property] = ctx.request[property];
  }
  if (ctx.session) req.session = ctx.session;
  // if (ctx.query) req.query = ctx.query;
  // if (ctx.request.body) req.body = ctx.request.body;
}