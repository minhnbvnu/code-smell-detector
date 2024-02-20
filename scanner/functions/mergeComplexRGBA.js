function mergeComplexRGBA(r, g, b, a) {
  var n = r.length,
      output = new ComplexArray(4 * n),
      i

  for(i = 0; i < n; i++) {
    output.real[4 * i    ] = r.real[i]
    output.imag[4 * i    ] = r.imag[i]
    output.real[4 * i + 1] = g.real[i]
    output.imag[4 * i + 1] = g.imag[i]
    output.real[4 * i + 2] = b.real[i]
    output.imag[4 * i + 2] = b.imag[i]
    output.real[4 * i + 3] = a.real[i]
    output.imag[4 * i + 3] = a.imag[i]
  }

  return output
}