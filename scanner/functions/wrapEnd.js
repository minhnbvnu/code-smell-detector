function wrapEnd (ctx) {
  const endFn = ctx.call.end
  ctx.call.end = function end (statusMetadata) {
    return endFn.call(ctx.call, Metadata.create(statusMetadata) || ctx.response.getStatusMetadata())
  }
}