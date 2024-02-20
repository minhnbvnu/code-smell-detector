async function execRes (ctx, handler, fn) {
  if (ctx.call instanceof stream.Readable) {
    ctx.call.on('error', (err) => onerror(err, ctx))
    onEnd(ctx.call, destroy.bind(null, ctx.call))
  }

  try {
    await handler(ctx)
    ctx.response.sendMetadata()
    const response = await Promise.resolve(ctx.res)
    const statusMetadata = ctx.response.getStatusMetadata()

    if (response instanceof Error) {
      return fn(response, null, statusMetadata)
    }

    return fn(null, response, statusMetadata)
  } catch (error) {
    onerror(error, ctx)
    fn(error)
  }
}