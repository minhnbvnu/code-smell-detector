function FFT2D(input, nx, ny, inverse) {
    var i, j,
        transform = inverse ? 'InvFFT' : 'FFT',
        output = new ComplexArray(input.length, input.ArrayType),
        row = new ComplexArray(nx, input.ArrayType),
        col = new ComplexArray(ny, input.ArrayType)

    for(j = 0; j < ny; j++) {
      row.map(function(v, i) {
        v.real = input.real[i + j * nx]
        v.imag = input.imag[i + j * nx]
      })
      row[transform]().forEach(function(v, i) {
        output.real[i + j * nx] = v.real
        output.imag[i + j * nx] = v.imag
      })
    }

    for(i = 0; i < nx; i++) {
      col.map(function(v, j) {
        v.real = output.real[i + j * nx]
        v.imag = output.imag[i + j * nx]
      })
      col[transform]().forEach(function(v, j) {
        output.real[i + j * nx] = v.real
        output.imag[i + j * nx] = v.imag
      })
    }

    return output
  }