function delegateHeaders(ctx, ctxCaller, headers) {
  if (ctxCaller && ctxCaller.headers) {
    Object.assign(ctx.headers, ctxCaller.headers);
  }
  if (headers) {
    Object.assign(ctx.headers, headers);
  }
}