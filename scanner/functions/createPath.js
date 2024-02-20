function createPath(char, scale, offsetX, offsetY, data) {

  var glyph = data.glyphs[char] || data.glyphs['?'];

  if (!glyph) return;

  var path = new ShapePath();

  var x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

  if (glyph.o) {

    var outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '));

    for (var i = 0, l = outline.length; i < l;) {

      var action = outline[i++];

      switch (action) {

        case 'm': // moveTo

          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.moveTo(x, y);

          break;

        case 'l': // lineTo

          x = outline[i++] * scale + offsetX;
          y = outline[i++] * scale + offsetY;

          path.lineTo(x, y);

          break;

        case 'q': // quadraticCurveTo

          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;

          path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);

          break;

        case 'b': // bezierCurveTo

          cpx = outline[i++] * scale + offsetX;
          cpy = outline[i++] * scale + offsetY;
          cpx1 = outline[i++] * scale + offsetX;
          cpy1 = outline[i++] * scale + offsetY;
          cpx2 = outline[i++] * scale + offsetX;
          cpy2 = outline[i++] * scale + offsetY;

          path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);

          break;

      }

    }

  }

  return { offsetX: glyph.ha * scale, path: path };

}