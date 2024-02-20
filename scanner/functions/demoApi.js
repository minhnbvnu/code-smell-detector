async function demoApi(ctx, next) {
  if (ctx.request.url.indexOf('/api/') === 0) {
    await apiRequest(ctx);
  } else {
    return next();
  }
}