function fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr) {
      dir |= 0
      nrows |= 0
      ncols |= 0
      x_ptr |= 0
      y_ptr |= 0
      var nn,m,i,i1,j,k,i2,l,l1,l2
      var c1,c2,t,t1,t2,u1,u2,z,row,a,b,c,d,k1,k2,k3

      // Calculate the number of points
      nn = ncols
      m = bits.log2(nn)

      for(row=0; row<nrows; ++row) {
        // Do the bit reversal
        i2 = nn >> 1;
        j = 0;
        for(i=0;i<nn-1;i++) {
          if(i < j) {
            t = buffer[x_ptr+i]
            buffer[x_ptr+i] = buffer[x_ptr+j]
            buffer[x_ptr+j] = t
            t = buffer[y_ptr+i]
            buffer[y_ptr+i] = buffer[y_ptr+j]
            buffer[y_ptr+j] = t
          }
          k = i2
          while(k <= j) {
            j -= k
            k >>= 1
          }
          j += k
        }

        // Compute the FFT
        c1 = -1.0
        c2 = 0.0
        l2 = 1
        for(l=0;l<m;l++) {
          l1 = l2
          l2 <<= 1
          u1 = 1.0
          u2 = 0.0
          for(j=0;j<l1;j++) {
            for(i=j;i<nn;i+=l2) {
              i1 = i + l1
              a = buffer[x_ptr+i1]
              b = buffer[y_ptr+i1]
              c = buffer[x_ptr+i]
              d = buffer[y_ptr+i]
              k1 = u1 * (a + b)
              k2 = a * (u2 - u1)
              k3 = b * (u1 + u2)
              t1 = k1 - k3
              t2 = k1 + k2
              buffer[x_ptr+i1] = c - t1
              buffer[y_ptr+i1] = d - t2
              buffer[x_ptr+i] += t1
              buffer[y_ptr+i] += t2
            }
            k1 = c1 * (u1 + u2)
            k2 = u1 * (c2 - c1)
            k3 = u2 * (c1 + c2)
            u1 = k1 - k3
            u2 = k1 + k2
          }
          c2 = Math.sqrt((1.0 - c1) / 2.0)
          if(dir < 0) {
            c2 = -c2
          }
          c1 = Math.sqrt((1.0 + c1) / 2.0)
        }

        // Scaling for inverse transform
        if(dir < 0) {
          var scale_f = 1.0 / nn
          for(i=0;i<nn;i++) {
            buffer[x_ptr+i] *= scale_f
            buffer[y_ptr+i] *= scale_f
          }
        }

        // Advance pointers
        x_ptr += ncols
        y_ptr += ncols
      }
    }