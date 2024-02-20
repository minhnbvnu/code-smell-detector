function minutes (step) {
  return Array.apply(null, Array(Math.ceil(60 / step))).map((item, index) => index * step)
}