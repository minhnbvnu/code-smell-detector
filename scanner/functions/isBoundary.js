function isBoundary(id, index) {
  return id.charAt(index) === SEPARATOR || index === id.length;
}