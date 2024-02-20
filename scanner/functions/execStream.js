async function execStream (ctx, handler) {
  wrapEnd(ctx)

  try {
    await handler(ctx)

    ctx.response.sendMetadata()
    ctx.res.pipe(ctx.call)
    ctx.res.on('error', err => {
      ctx.call.emit('error', err)
      onerror(err, ctx)
    })
  } catch (error) {
    ctx.call.emit('error', error)
    onerror(error, ctx)
  }
}