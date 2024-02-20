function complexAdjustableColorFilter(matrixAdjustFn) {
      return function (ir, adjust) {
        return colorFilter(ir, matrixAdjustFn(identity$1(), adjust));
      };
    }