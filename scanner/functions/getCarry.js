function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}