function setDifference(x, y) {
  return new Set([...x].filter(value => !y.has(value)));
}