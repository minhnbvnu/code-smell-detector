function hours (step) {
  return Array.apply(null, Array(Math.ceil(24 / step))).map((item, index) => index * step)
}