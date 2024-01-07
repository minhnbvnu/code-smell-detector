function parseAlpha(alphaString) {
  const alpha = parseFloat(alphaString);
  return isNaN(alpha) ? 1 : Math.min(Math.max(alpha, 0), 1);
}