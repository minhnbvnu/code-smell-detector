async function writeStuff (ctx) {
    callType = utils.getCallTypeFromCall(ctx.call)
    ctx.res = await doWork(ctx.req)
  }