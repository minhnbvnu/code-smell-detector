async function mw3 (ctx, next) {
    ctx.mw1 = 'mw3'
    await next()
  }