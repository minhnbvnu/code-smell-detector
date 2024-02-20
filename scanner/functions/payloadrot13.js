function payloadrot13 (ctx, next) {
  ctx.mw = (ctx.mw || '').concat(':rot13')
  return next().then(() => {
    ctx.res.message = strrot13(ctx.res.message)
  })
}