function SimpleGlyph(raw, numberOfContours, xMin, yMin, xMax, yMax) {
    this.raw = raw;
    this.numberOfContours = numberOfContours;
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.compound = false;
  }