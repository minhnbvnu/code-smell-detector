function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
    const coords = context.coords,
          colors = context.colors;
    const bytes = data.data,
          rowSize = data.width * 4;
    let tmp;

    if (coords[p1 + 1] > coords[p2 + 1]) {
      tmp = p1;
      p1 = p2;
      p2 = tmp;
      tmp = c1;
      c1 = c2;
      c2 = tmp;
    }

    if (coords[p2 + 1] > coords[p3 + 1]) {
      tmp = p2;
      p2 = p3;
      p3 = tmp;
      tmp = c2;
      c2 = c3;
      c3 = tmp;
    }

    if (coords[p1 + 1] > coords[p2 + 1]) {
      tmp = p1;
      p1 = p2;
      p2 = tmp;
      tmp = c1;
      c1 = c2;
      c2 = tmp;
    }

    const x1 = (coords[p1] + context.offsetX) * context.scaleX;
    const y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
    const x2 = (coords[p2] + context.offsetX) * context.scaleX;
    const y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
    const x3 = (coords[p3] + context.offsetX) * context.scaleX;
    const y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;

    if (y1 >= y3) {
      return;
    }

    const c1r = colors[c1],
          c1g = colors[c1 + 1],
          c1b = colors[c1 + 2];
    const c2r = colors[c2],
          c2g = colors[c2 + 1],
          c2b = colors[c2 + 2];
    const c3r = colors[c3],
          c3g = colors[c3 + 1],
          c3b = colors[c3 + 2];
    const minY = Math.round(y1),
          maxY = Math.round(y3);
    let xa, car, cag, cab;
    let xb, cbr, cbg, cbb;

    for (let y = minY; y <= maxY; y++) {
      if (y < y2) {
        let k;

        if (y < y1) {
          k = 0;
        } else if (y1 === y2) {
          k = 1;
        } else {
          k = (y1 - y) / (y1 - y2);
        }

        xa = x1 - (x1 - x2) * k;
        car = c1r - (c1r - c2r) * k;
        cag = c1g - (c1g - c2g) * k;
        cab = c1b - (c1b - c2b) * k;
      } else {
        let k;

        if (y > y3) {
          k = 1;
        } else if (y2 === y3) {
          k = 0;
        } else {
          k = (y2 - y) / (y2 - y3);
        }

        xa = x2 - (x2 - x3) * k;
        car = c2r - (c2r - c3r) * k;
        cag = c2g - (c2g - c3g) * k;
        cab = c2b - (c2b - c3b) * k;
      }

      let k;

      if (y < y1) {
        k = 0;
      } else if (y > y3) {
        k = 1;
      } else {
        k = (y1 - y) / (y1 - y3);
      }

      xb = x1 - (x1 - x3) * k;
      cbr = c1r - (c1r - c3r) * k;
      cbg = c1g - (c1g - c3g) * k;
      cbb = c1b - (c1b - c3b) * k;
      const x1_ = Math.round(Math.min(xa, xb));
      const x2_ = Math.round(Math.max(xa, xb));
      let j = rowSize * y + x1_ * 4;

      for (let x = x1_; x <= x2_; x++) {
        k = (xa - x) / (xa - xb);

        if (k < 0) {
          k = 0;
        } else if (k > 1) {
          k = 1;
        }

        bytes[j++] = car - (car - cbr) * k | 0;
        bytes[j++] = cag - (cag - cbg) * k | 0;
        bytes[j++] = cab - (cab - cbb) * k | 0;
        bytes[j++] = 255;
      }
    }
  }