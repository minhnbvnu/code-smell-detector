function softmax (x) {
      var e = NdArray.new(x).exp();
      var se = e.sum(); // scalar
      ops.divseq(e.selection, se);
      return e;
    }