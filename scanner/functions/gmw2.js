async function gmw2 (ctx, next) {
  ctx.mw = (ctx.mw || '').concat(':gmw2')
  await next()
  gmwcalled[ctx.req.id] = (gmwcalled[ctx.req.id] || '').concat(':gmw2')
}