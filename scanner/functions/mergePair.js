function mergePair(dest, src) {
  for (const key of Object.keys(src)) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}