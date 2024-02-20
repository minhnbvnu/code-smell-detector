function componentizedPaletteToArray(paletteRGB) {
      var paletteArray = [],
        i, r, g, b;
      for (i = 0; i < paletteRGB.length; i += 3) {
        r = paletteRGB[i];
        g = paletteRGB[i + 1];
        b = paletteRGB[i + 2];
        paletteArray.push(r << 16 | g << 8 | b);
      }
      return paletteArray;
    }