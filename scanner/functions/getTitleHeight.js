function getTitleHeight(options, fallback) {
  if (!options.display) {
    return 0;
  }

  const font = toFont(options.font, fallback);
  const padding = toPadding(options.padding);
  const lines = isArray(options.text) ? options.text.length : 1;

  return (lines * font.lineHeight) + padding.height;
}