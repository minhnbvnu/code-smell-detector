function kernel(d1, w, h, k, d2) {
    if (!d2) d2 = []
    var idx, i, j
    for(i = 1; i < h - 1; i++) {
      for(j = 1; j < w - 1; j++) {
        idx = i * w + j
        // WARNING: Optimized code.
        d2[idx] = (
            d1[(i - 1) * w + (j - 1)] * k[0]
          + d1[(i - 1) * w + (j    )] * k[1]
          + d1[(i - 1) * w + (j + 1)] * k[2]
          + d1[(i    ) * w + (j - 1)] * k[3]
          + d1[(i    ) * w + (j    )] * k[4]
          + d1[(i    ) * w + (j + 1)] * k[5]
          + d1[(i + 1) * w + (j - 1)] * k[6]
          + d1[(i + 1) * w + (j    )] * k[7]
          + d1[(i + 1) * w + (j + 1)] * k[8]
        ) | 0
      }
    }
  }