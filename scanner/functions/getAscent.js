function getAscent(fontFamily, ctx) {
    const cachedAscent = ascentCache.get(fontFamily);

    if (cachedAscent) {
      return cachedAscent;
    }

    ctx.save();
    ctx.font = `${DEFAULT_FONT_SIZE}px ${fontFamily}`;
    const metrics = ctx.measureText("");
    let ascent = metrics.fontBoundingBoxAscent;
    let descent = Math.abs(metrics.fontBoundingBoxDescent);

    if (ascent) {
      ctx.restore();
      const ratio = ascent / (ascent + descent);
      ascentCache.set(fontFamily, ratio);
      return ratio;
    }

    ctx.strokeStyle = "red";
    ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
    ctx.strokeText("g", 0, 0);
    let pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
    descent = 0;

    for (let i = pixels.length - 1 - 3; i >= 0; i -= 4) {
      if (pixels[i] > 0) {
        descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE);
        break;
      }
    }

    ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE);
    ctx.strokeText("A", 0, DEFAULT_FONT_SIZE);
    pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE).data;
    ascent = 0;

    for (let i = 0, ii = pixels.length; i < ii; i += 4) {
      if (pixels[i] > 0) {
        ascent = DEFAULT_FONT_SIZE - Math.floor(i / 4 / DEFAULT_FONT_SIZE);
        break;
      }
    }

    ctx.restore();

    if (ascent) {
      const ratio = ascent / (ascent + descent);
      ascentCache.set(fontFamily, ratio);
      return ratio;
    }

    ascentCache.set(fontFamily, DEFAULT_FONT_ASCENT);
    return DEFAULT_FONT_ASCENT;
  }