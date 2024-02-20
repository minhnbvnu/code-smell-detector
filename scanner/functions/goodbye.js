function goodbye (ctx) {
    const msg = ctx.message || ''
    ctx.res = { message: msg + ':Goodbye ' + ctx.req.name }
  }