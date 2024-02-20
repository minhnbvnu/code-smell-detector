function applymask (m) {
    var x, y, r3x, r3y

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!((x + y) & 1) && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) { r3x = 0 }
            if (!r3x && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) { r3y = 0 }
          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) { r3x = 0 }
            if (!r3x && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = ((y >> 1) & 1), x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0
              r3y = !r3y
            }
            if (!r3y && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) { r3y = 0 }
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) { r3x = 0 }
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) { r3y = 0 }
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) { r3x = 0 }
            if (!(((x & y & 1) + (r3x && (r3x == r3y))) & 1) && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) { r3y = 0 }
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) { r3x = 0 }
            if (!(((r3x && (r3x == r3y)) + ((x + y) & 1)) & 1) && !ismasked(x, y)) { qrframe[x + y * width] ^= 1 }
          }
        }
        break
    }
  }