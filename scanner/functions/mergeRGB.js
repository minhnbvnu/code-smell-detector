function mergeRGB(r, g, b) {
    var n = r.length,
        output = new ComplexArray(n * 4),
        i

    for(i = 0; i < n; i++) {
      output.real[4 * i    ] = r.real[i]
      output.imag[4 * i    ] = r.imag[i]
      output.real[4 * i + 1] = g.real[i]
      output.imag[4 * i + 1] = g.imag[i]
      output.real[4 * i + 2] = b.real[i]
      output.imag[4 * i + 2] = b.imag[i]
    }

    return output
  }