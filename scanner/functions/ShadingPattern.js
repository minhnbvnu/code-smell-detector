function ShadingPattern(type, coords, colors, gState, matrix) {
  if (!(this instanceof ShadingPattern)) {
    return new ShadingPattern(type, coords, colors, gState, matrix);
  }

  // see putPattern() for information how they are realized
  this.type = type === "axial" ? 2 : 3;
  this.coords = coords;
  this.colors = colors;

  Pattern.call(this, gState, matrix);
}