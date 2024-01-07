function RadialAxial(dict, matrix, xref, resources, pdfFunctionFactory, localColorSpaceCache) {
    this.matrix = matrix;
    this.coordsArr = dict.getArray("Coords");
    this.shadingType = dict.get("ShadingType");
    this.type = "Pattern";

    const cs = _colorspace.ColorSpace.parse({
      cs: dict.getRaw("ColorSpace") || dict.getRaw("CS"),
      xref,
      resources,
      pdfFunctionFactory,
      localColorSpaceCache
    });

    this.cs = cs;
    const bbox = dict.getArray("BBox");

    if (Array.isArray(bbox) && bbox.length === 4) {
      this.bbox = _util.Util.normalizeRect(bbox);
    } else {
      this.bbox = null;
    }

    let t0 = 0.0,
        t1 = 1.0;

    if (dict.has("Domain")) {
      const domainArr = dict.getArray("Domain");
      t0 = domainArr[0];
      t1 = domainArr[1];
    }

    let extendStart = false,
        extendEnd = false;

    if (dict.has("Extend")) {
      const extendArr = dict.getArray("Extend");
      extendStart = extendArr[0];
      extendEnd = extendArr[1];
    }

    if (this.shadingType === ShadingType.RADIAL && (!extendStart || !extendEnd)) {
      const [x1, y1, r1, x2, y2, r2] = this.coordsArr;
      const distance = Math.hypot(x1 - x2, y1 - y2);

      if (r1 <= r2 + distance && r2 <= r1 + distance) {
        (0, _util.warn)("Unsupported radial gradient.");
      }
    }

    this.extendStart = extendStart;
    this.extendEnd = extendEnd;
    const fnObj = dict.getRaw("Function");
    const fn = pdfFunctionFactory.createFromArray(fnObj);
    const NUMBER_OF_SAMPLES = 10;
    const step = (t1 - t0) / NUMBER_OF_SAMPLES;
    const colorStops = this.colorStops = [];

    if (t0 >= t1 || step <= 0) {
      (0, _util.info)("Bad shading domain.");
      return;
    }

    const color = new Float32Array(cs.numComps),
          ratio = new Float32Array(1);
    let rgbColor;

    for (let i = 0; i <= NUMBER_OF_SAMPLES; i++) {
      ratio[0] = t0 + i * step;
      fn(ratio, 0, color, 0);
      rgbColor = cs.getRgb(color, 0);

      const cssColor = _util.Util.makeHexColor(rgbColor[0], rgbColor[1], rgbColor[2]);

      colorStops.push([i / NUMBER_OF_SAMPLES, cssColor]);
    }

    let background = "transparent";

    if (dict.has("Background")) {
      rgbColor = cs.getRgb(dict.get("Background"), 0);
      background = _util.Util.makeHexColor(rgbColor[0], rgbColor[1], rgbColor[2]);
    }

    if (!extendStart) {
      colorStops.unshift([0, background]);
      colorStops[1][0] += Shadings.SMALL_NUMBER;
    }

    if (!extendEnd) {
      colorStops[colorStops.length - 1][0] -= Shadings.SMALL_NUMBER;
      colorStops.push([1, background]);
    }

    this.colorStops = colorStops;
  }