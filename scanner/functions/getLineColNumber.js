function getLineColNumber(numStr) {
  const num = parseInt(numStr || 0, 10);
  return Math.max(num - 1, 0);
}