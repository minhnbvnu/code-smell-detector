function ifft (x) {
      x = (x instanceof NdArray) ? x.clone() : NdArray.new(x);
      var xShape = x.shape;
      var d = xShape.length;
      if (xShape[d - 1] !== 2) {
        throw new errors.ValueError('expect last dimension of the array to have 2 values (for both real and imaginary part)');
      }
      var rPicker = new Array(d);
      var iPicker = new Array(d);
      rPicker[d - 1] = 0;
      iPicker[d - 1] = 1;
      ndFFT(-1, x.selection.pick.apply(x.selection, rPicker), x.selection.pick.apply(x.selection, iPicker));
      return x;
    }