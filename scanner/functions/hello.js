function hello (ctx) {
    const msg = ctx.message || ''
    ctx.res = { message: msg + ':Hello ' + ctx.req.name }
  }