function basicColorFilter(matrix) {
      return function (ir) {
        return colorFilter(ir, matrix);
      };
    }