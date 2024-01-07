function parseIndex(index) {
  index = index.trim();

  if (index === "*") {
    return Infinity;
  }

  return parseInt(index, 10) || 0;
}