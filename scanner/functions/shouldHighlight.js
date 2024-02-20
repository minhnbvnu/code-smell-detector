function shouldHighlight(options) {
  return !!Chalk.supportsColor || options.forceColor;
}