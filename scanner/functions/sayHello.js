function sayHello (ctx) {
    callType = utils.getCallTypeFromCall(ctx.call)
    ctx.res = { message: 'Hello ' + ctx.req.name }
  }