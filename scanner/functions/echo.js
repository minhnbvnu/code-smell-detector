async function echo (ctx) {
    ctx.res = {
      message: ctx.req.message,
      value: ctx.value,
      mw: ctx.mw
    }
  }