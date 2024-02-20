function _triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 120) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 240) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }