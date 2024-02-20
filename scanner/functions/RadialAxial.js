function RadialAxial(dict, matrix, xref, res) {
    this.matrix = matrix;
    this.coordsArr = dict.get('Coords');
    this.shadingType = dict.get('ShadingType');
    this.type = 'Pattern';
    var cs = dict.get('ColorSpace', 'CS');
    cs = ColorSpace.parse(cs, xref, res);
    this.cs = cs;

    var t0 = 0.0, t1 = 1.0;
    if (dict.has('Domain')) {
      var domainArr = dict.get('Domain');
      t0 = domainArr[0];
      t1 = domainArr[1];
    }

    var extendStart = false, extendEnd = false;
    if (dict.has('Extend')) {
      var extendArr = dict.get('Extend');
      extendStart = extendArr[0];
      extendEnd = extendArr[1];
    }

    if (this.shadingType === PatternType.RADIAL &&
       (!extendStart || !extendEnd)) {
      // Radial gradient only currently works if either circle is fully within
      // the other circle.
      var x1 = this.coordsArr[0];
      var y1 = this.coordsArr[1];
      var r1 = this.coordsArr[2];
      var x2 = this.coordsArr[3];
      var y2 = this.coordsArr[4];
      var r2 = this.coordsArr[5];
      var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      if (r1 <= r2 + distance &&
          r2 <= r1 + distance) {
        warn('Unsupported radial gradient.');
      }
    }

    this.extendStart = extendStart;
    this.extendEnd = extendEnd;

    var fnObj = dict.get('Function');
    var fn = PDFFunction.parseArray(xref, fnObj);

    // 10 samples seems good enough for now, but probably won't work
    // if there are sharp color changes. Ideally, we would implement
    // the spec faithfully and add lossless optimizations.
    var diff = t1 - t0;
    var step = diff / 10;

    var colorStops = this.colorStops = [];

    // Protect against bad domains so we don't end up in an infinte loop below.
    if (t0 >= t1 || step <= 0) {
      // Acrobat doesn't seem to handle these cases so we'll ignore for
      // now.
      info('Bad shading domain.');
      return;
    }

    var color = new Float32Array(cs.numComps), ratio = new Float32Array(1);
    var rgbColor;
    for (var i = t0; i <= t1; i += step) {
      ratio[0] = i;
      fn(ratio, 0, color, 0);
      rgbColor = cs.getRgb(color, 0);
      var cssColor = Util.makeCssRgb(rgbColor[0], rgbColor[1], rgbColor[2]);
      colorStops.push([(i - t0) / diff, cssColor]);
    }

    var background = 'transparent';
    if (dict.has('Background')) {
      rgbColor = cs.getRgb(dict.get('Background'), 0);
      background = Util.makeCssRgb(rgbColor[0], rgbColor[1], rgbColor[2]);
    }

    if (!extendStart) {
      // Insert a color stop at the front and offset the first real color stop
      // so it doesn't conflict with the one we insert.
      colorStops.unshift([0, background]);
      colorStops[1][0] += Shadings.SMALL_NUMBER;
    }
    if (!extendEnd) {
      // Same idea as above in extendStart but for the end.
      colorStops[colorStops.length - 1][0] -= Shadings.SMALL_NUMBER;
      colorStops.push([1, background]);
    }

    this.colorStops = colorStops;
  }