function resize$1(ir, w, h) {
      return ir.toCanvas().then(function (canvas) {
        return scale(canvas, w, h).then(function (newCanvas) {
          return fromCanvas(newCanvas, ir.getType());
        });
      });
    }