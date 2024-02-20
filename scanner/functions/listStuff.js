function listStuff (ctx) {
    callType = utils.getCallTypeFromCall(ctx.call)
    ctx.res = hl(getArrayData())
      .map(d => {
        d.message = d.message.toUpperCase()
        return d
      })
  }