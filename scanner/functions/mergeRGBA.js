function mergeRGBA(r, g, b, a) {
  var n = r.length,
      output = new Uint8ClampedArray(4 * n),
      i

  for(i = 0; i < n; i++) {
    output[4 * i    ] = r[i]
    output[4 * i + 1] = g[i]
    output[4 * i + 2] = b[i]
    output[4 * i + 3] = a[i]
  }
  return output
}