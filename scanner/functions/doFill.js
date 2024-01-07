function doFill(ctx, cfg) {
  const {line, target, above, below, area, scale} = cfg;
  const property = line._loop ? 'angle' : cfg.axis;

  ctx.save();

  if (property === 'x' && below !== above) {
    clipVertical(ctx, target, area.top);
    fill(ctx, {line, target, color: above, scale, property});
    ctx.restore();
    ctx.save();
    clipVertical(ctx, target, area.bottom);
  }
  fill(ctx, {line, target, color: below, scale, property});

  ctx.restore();
}