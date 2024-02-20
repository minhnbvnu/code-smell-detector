function fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
      dir |= 0
      nrows |= 0
      ncols |= 0
      x_ptr |= 0
      y_ptr |= 0
      scratch_ptr |= 0

      // Initialize tables
      var m = bits.nextPow2(2 * ncols + 1)
        , cos_ptr = scratch_ptr
        , sin_ptr = cos_ptr + ncols
        , xs_ptr  = sin_ptr + ncols
        , ys_ptr  = xs_ptr  + m
        , cft_ptr = ys_ptr  + m
        , sft_ptr = cft_ptr + m
        , w = -dir * Math.PI / ncols
        , row, a, b, c, d, k1, k2, k3
        , i
      for(i=0; i<ncols; ++i) {
        a = w * ((i * i) % (ncols * 2))
        c = Math.cos(a)
        d = Math.sin(a)
        buffer[cft_ptr+(m-i)] = buffer[cft_ptr+i] = buffer[cos_ptr+i] = c
        buffer[sft_ptr+(m-i)] = buffer[sft_ptr+i] = buffer[sin_ptr+i] = d
      }
      for(i=ncols; i<=m-ncols; ++i) {
        buffer[cft_ptr+i] = 0.0
      }
      for(i=ncols; i<=m-ncols; ++i) {
        buffer[sft_ptr+i] = 0.0
      }

      fftRadix2(1, 1, m, buffer, cft_ptr, sft_ptr)

      //Compute scale factor
      if(dir < 0) {
        w = 1.0 / ncols
      } else {
        w = 1.0
      }

      //Handle direction
      for(row=0; row<nrows; ++row) {

        // Copy row into scratch memory, multiply weights
        for(i=0; i<ncols; ++i) {
          a = buffer[x_ptr+i]
          b = buffer[y_ptr+i]
          c = buffer[cos_ptr+i]
          d = -buffer[sin_ptr+i]
          k1 = c * (a + b)
          k2 = a * (d - c)
          k3 = b * (c + d)
          buffer[xs_ptr+i] = k1 - k3
          buffer[ys_ptr+i] = k1 + k2
        }
        //Zero out the rest
        for(i=ncols; i<m; ++i) {
          buffer[xs_ptr+i] = 0.0
        }
        for(i=ncols; i<m; ++i) {
          buffer[ys_ptr+i] = 0.0
        }

        // FFT buffer
        fftRadix2(1, 1, m, buffer, xs_ptr, ys_ptr)

        // Apply multiplier
        for(i=0; i<m; ++i) {
          a = buffer[xs_ptr+i]
          b = buffer[ys_ptr+i]
          c = buffer[cft_ptr+i]
          d = buffer[sft_ptr+i]
          k1 = c * (a + b)
          k2 = a * (d - c)
          k3 = b * (c + d)
          buffer[xs_ptr+i] = k1 - k3
          buffer[ys_ptr+i] = k1 + k2
        }

        // Inverse FFT buffer
        fftRadix2(-1, 1, m, buffer, xs_ptr, ys_ptr)

        // Copy result back into x/y
        for(i=0; i<ncols; ++i) {
          a = buffer[xs_ptr+i]
          b = buffer[ys_ptr+i]
          c = buffer[cos_ptr+i]
          d = -buffer[sin_ptr+i]
          k1 = c * (a + b)
          k2 = a * (d - c)
          k3 = b * (c + d)
          buffer[x_ptr+i] = w * (k1 - k3)
          buffer[y_ptr+i] = w * (k1 + k2)
        }

        x_ptr += ncols
        y_ptr += ncols
      }
    }