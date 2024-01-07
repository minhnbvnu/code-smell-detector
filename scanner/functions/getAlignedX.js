function getAlignedX(tooltip, align, options) {
  const padding = toPadding(options.padding);

  return align === 'center'
    ? tooltip.x + tooltip.width / 2
    : align === 'right'
      ? tooltip.x + tooltip.width - padding.right
      : tooltip.x + padding.left;
}