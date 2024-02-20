function splitRGB(data) {
    var n = data.length / 4,
        r = new Uint8ClampedArray(n),
        g = new Uint8ClampedArray(n),
        b = new Uint8ClampedArray(n),
        i

    for(i = 0; i < n; i++) {
      r[i] = data[4 * i    ]
      g[i] = data[4 * i + 1]
      b[i] = data[4 * i + 2]
    }

    return [r, g, b]
  }