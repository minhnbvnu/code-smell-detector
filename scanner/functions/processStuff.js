async function processStuff (ctx) {
    callType = utils.getCallTypeFromCall(ctx.call)
    ctx.req.on('data', d => {
      ctx.req.pause()
      _.delay(() => {
        const ret = {
          message: d.message.toUpperCase()
        }
        ctx.res.write(ret)
        ctx.req.resume()
      }, _.random(50, 150))
    })

    ctx.req.on('end', () => {
      _.delay(() => {
        ctx.res.end()
      }, 200)
    })
  }