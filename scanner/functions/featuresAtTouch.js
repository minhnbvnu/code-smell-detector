function featuresAtTouch(event, bbox, ctx) {
  return featuresAt(event, bbox, ctx, ctx.options.touchBuffer);
}