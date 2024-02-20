async function gmw3 (ctx, next) {
  ctx.mw = (ctx.mw || '').concat(':gmw3')
  await next()
  gmwcalled[ctx.req.id] = (gmwcalled[ctx.req.id] || '').concat(':gmw3')
}