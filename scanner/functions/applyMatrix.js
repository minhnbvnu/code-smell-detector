function applyMatrix(pIn, pOut, aMatrix) {
        function clamp(value, min, max) {
          if (value > max) {
            value = max;
          } else if (value < min) {
            value = min;
          }
          return value;
        }
        var side = Math.round(Math.sqrt(aMatrix.length));
        var halfSide = Math.floor(side / 2);
        var rgba = pIn.data;
        var drgba = pOut.data;
        var w = pIn.width;
        var h = pIn.height;
        for (var y = 0; y < h; y++) {
          for (var x = 0; x < w; x++) {
            var r = 0;
            var g = 0;
            var b = 0;
            for (var cy = 0; cy < side; cy++) {
              for (var cx = 0; cx < side; cx++) {
                var scx = clamp(x + cx - halfSide, 0, w - 1);
                var scy = clamp(y + cy - halfSide, 0, h - 1);
                var innerOffset = (scy * w + scx) * 4;
                var wt = aMatrix[cy * side + cx];
                r += rgba[innerOffset] * wt;
                g += rgba[innerOffset + 1] * wt;
                b += rgba[innerOffset + 2] * wt;
              }
            }
            var offset = (y * w + x) * 4;
            drgba[offset] = clamp(r, 0, 255);
            drgba[offset + 1] = clamp(g, 0, 255);
            drgba[offset + 2] = clamp(b, 0, 255);
          }
        }
        return pOut;
      }