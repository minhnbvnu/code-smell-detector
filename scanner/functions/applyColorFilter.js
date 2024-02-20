function applyColorFilter(canvas, type, matrix) {
      var context = get2dContext(canvas);
      function applyMatrix(pixelsData, m) {
        var r, g, b, a;
        var data = pixelsData.data, m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7], m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11], m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15], m16 = m[16], m17 = m[17], m18 = m[18], m19 = m[19];
        for (var i = 0; i < data.length; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          a = data[i + 3];
          data[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
          data[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
          data[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
          data[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19;
        }
        return pixelsData;
      }
      var pixels = applyMatrix(context.getImageData(0, 0, canvas.width, canvas.height), matrix);
      context.putImageData(pixels, 0, 0);
      return fromCanvas(canvas, type);
    }