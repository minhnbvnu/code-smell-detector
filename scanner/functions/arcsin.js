function arcsin (x) {
      var s = (x instanceof NdArray) ? x.clone() : NdArray.new(x);
      ops.asineq(s.selection);
      return s;
    }