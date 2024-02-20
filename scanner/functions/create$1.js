function create$1(rOrSource, g, b) {
  if (typeof rOrSource === "number") {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return PaletteRGB.from(SwatchRGB.create(rOrSource, g, b));
  } else {
    return PaletteRGB.from(rOrSource);
  }
}