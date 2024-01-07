function getRgbColor(color) {
  const rgbColor = new Uint8ClampedArray(3);

  if (!Array.isArray(color)) {
    return rgbColor;
  }

  switch (color.length) {
    case 0:
      return null;

    case 1:
      _colorspace.ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    case 3:
      _colorspace.ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    case 4:
      _colorspace.ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);

      return rgbColor;

    default:
      return rgbColor;
  }
}