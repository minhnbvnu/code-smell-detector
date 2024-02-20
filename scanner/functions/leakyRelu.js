function leakyRelu (x, alpha) {
      alpha = alpha || 1e-3;
      var s = (x instanceof NdArray) ? x.clone() : NdArray.new(x);
      doLeakyRelu(s.selection, alpha);
      return s;
    }