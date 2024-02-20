async function lower (ctx) {
    ctx.res = {
      message: ctx.req.message.toLowerCase(),
      value: ctx.value,
      mw: ctx.mw
    }
  }