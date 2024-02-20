async function execDuplex (ctx, handler) {
  wrapEnd(ctx)
  ctx.call.on('error', (err) => onerror(err, ctx))
  ctx.call.on('finish', destroy.bind(null, ctx.call))

  try {
    await handler(ctx)
    ctx.response.sendMetadata()
  } catch (error) {
    ctx.call.emit('error', error)
    onerror(error, ctx)
  }
}