function colorFilter(ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyColorFilter(canvas, ir.getType(), matrix);
      });
    }