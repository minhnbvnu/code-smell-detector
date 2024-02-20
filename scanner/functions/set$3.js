function set$3(x, y, c) {
      if (x < p.width && x >= 0 && y >= 0 && y < p.height) {
        replaceContext();
        p.pixels.setPixel((0 | x) + p.width * (0 | y), c);
        if (++setPixelsCached > maxPixelsCached) resetContext()
      }
    }