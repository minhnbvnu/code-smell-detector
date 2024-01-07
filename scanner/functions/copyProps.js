function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}