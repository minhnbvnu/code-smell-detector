function formatCssPct(part, whole) {
  return roundTo(part / whole * 100, cssPrecision) + '%';
}