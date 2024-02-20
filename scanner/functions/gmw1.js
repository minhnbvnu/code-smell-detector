async function gmw1 (ctx, next) {
  ctx.mw = (ctx.mw || '').concat('gmw1')
  await next()
  gmwcalled[ctx.req.id] = (gmwcalled[ctx.req.id] || '').concat(':gmw1')
}