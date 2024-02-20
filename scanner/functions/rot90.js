function rot90 (m, k, axes) {
      k = k || 1;
      while (k < 0) {
        k += 4;
      }
      k = k % 4;
      m = NdArray.new(m);
      axes = NdArray.new(axes || [0, 1]);
      if (axes.shape.length !== 1 || axes.shape[0] !== 2) {
        throw new errors.ValueError('len(axes) must be 2');
      }
      axes = axes.tolist();
      if (axes[0] === axes[1] || abs(axes[0] - axes[1]) === m.ndim) {
        throw new errors.ValueError("Axes must be different.")
      }

      if (k === 0) {
        return m;
      }
      if (k === 2) {
        return flip(flip(m, axes[0]), axes[1]);
      }
      var axesList = arange(m.ndim).tolist();
      var keep = axesList[axes[0]];
      axesList[axes[0]] = axesList[axes[1]];
      axesList[axes[1]] = keep;
      if (k === 1) {
        return transpose(flip(m, axes[1]), axesList);
      } else {
        return flip(transpose(m, axesList), axes[1]);
      }
    }