function basicConvolutionFilter(kernel) {
      return function (ir) {
        return convoluteFilter(ir, kernel);
      };
    }