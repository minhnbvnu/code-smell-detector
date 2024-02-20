function FFT_2_Iterative(input, inverse) {
    var
      n = input.length,
      // Counters.
      i, j,
      output, output_r, output_i,
      // Complex multiplier and its delta.
      f_r, f_i, del_f_r, del_f_i, temp,
      // Temporary loop variables.
      l_index, r_index,
      left_r, left_i, right_r, right_i,
      // width of each sub-array for which we're iteratively calculating FFT.
      width

    output = BitReverseComplexArray(input)
    output_r = output.real
    output_i = output.imag
    // Loops go like O(n log n):
    //   width ~ log n; i,j ~ n
    width = 1
    while (width < n) {
      del_f_r = cos(PI/width)
      del_f_i = (inverse ? -1 : 1) * sin(PI/width)
      for (i = 0; i < n/(2*width); i++) {
        f_r = 1
        f_i = 0
        for (j = 0; j < width; j++) {
          l_index = 2*i*width + j
          r_index = l_index + width

          left_r = output_r[l_index]
          left_i = output_i[l_index]
          right_r = f_r * output_r[r_index] - f_i * output_i[r_index]
          right_i = f_i * output_r[r_index] + f_r * output_i[r_index]

          output_r[l_index] = SQRT1_2 * (left_r + right_r)
          output_i[l_index] = SQRT1_2 * (left_i + right_i)
          output_r[r_index] = SQRT1_2 * (left_r - right_r)
          output_i[r_index] = SQRT1_2 * (left_i - right_i)
          temp = f_r * del_f_r - f_i * del_f_i
          f_i = f_r * del_f_i + f_i * del_f_r
          f_r = temp
        }
      }
      width <<= 1
    }

    return output
  }