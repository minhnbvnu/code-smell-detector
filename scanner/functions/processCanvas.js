function processCanvas (canvas) {
      var context = canvas.getContext('2d');
      var pixels = context.getImageData(0, 0, canvas.width, canvas.height);

      var shape = [canvas.width, canvas.height, 4];
      var stride = [4, 4 * canvas.width, 1];
      var wxh = ndarray(new Uint8Array(pixels.data), shape, stride, 0);
      var hxw = wxh.transpose(1, 0);

      if (isGrayscale(hxw)) {
        hxw = hxw.pick(null, null, 0);
      }
      return new NdArray(hxw);
    }