function functionColorFilter(colorFn) {
      var filterImpl = function (canvas, type, value) {
        var context = get2dContext(canvas);
        var lookup = new Array(256);
        function applyLookup(pixelsData, lookupData) {
          var data = pixelsData.data;
          for (var i = 0; i < data.length; i += 4) {
            data[i] = lookupData[data[i]];
            data[i + 1] = lookupData[data[i + 1]];
            data[i + 2] = lookupData[data[i + 2]];
          }
          return pixelsData;
        }
        for (var i = 0; i < lookup.length; i++) {
          lookup[i] = colorFn(i, value);
        }
        var pixels = applyLookup(context.getImageData(0, 0, canvas.width, canvas.height), lookup);
        context.putImageData(pixels, 0, 0);
        return fromCanvas(canvas, type);
      };
      return function (ir, value) {
        return ir.toCanvas().then(function (canvas) {
          return filterImpl(canvas, ir.getType(), value);
        });
      };
    }