async function reverseMW (ctx, next) {
  if (ctx.req.message) {
    ctx.req.message = reverseString(ctx.req.message)
  }
  ctx.mw = (ctx.mw || '').concat(':reverse')
  await next()
}