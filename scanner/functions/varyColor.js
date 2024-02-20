function varyColor(col, variance) {
    variance = variance || 0;
    let color = Qolor.parse(col), rgb;
    if (!color.isValid()) {
      rgb = DEFAULT_COLOR;
    } else {
      // desaturate colors
      rgb = color.saturation(0.7).toArray();
    }
    return [rgb[0]+variance, rgb[1]+variance, rgb[2]+variance];
  }