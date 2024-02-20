function BitReverseComplexArray(array) {
    var n = array.length,
        flips = {},
        swap,
        i

    for(i = 0; i < n; i++) {
      var r_i = BitReverseIndex(i, n)

      if (flips.hasOwnProperty(i) || flips.hasOwnProperty(r_i)) continue

      swap = array.real[r_i]
      array.real[r_i] = array.real[i]
      array.real[i] = swap

      swap = array.imag[r_i]
      array.imag[r_i] = array.imag[i]
      array.imag[i] = swap

      flips[i] = flips[r_i] = true
    }

    return array
  }