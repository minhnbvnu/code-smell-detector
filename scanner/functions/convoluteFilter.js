function convoluteFilter(ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyConvoluteFilter(canvas, ir.getType(), matrix);
      });
    }