function featuresAtClick(event, bbox, ctx) {
  return featuresAt(event, bbox, ctx, ctx.options.clickBuffer);
}