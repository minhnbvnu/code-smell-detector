function parseNumber(num) {
  return {
    float: Math.abs(parseFloat(num)),
    int: Math.abs(parseInt(num)),
    sign: Math.sign(num) < 0 ? '-' : ''
  }
}