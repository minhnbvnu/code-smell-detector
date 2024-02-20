function processImg (img) {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      var pixels = context.getImageData(0, 0, img.width, img.height);

      var shape = [img.width, img.height, 4];
      var stride = [4, 4 * img.width, 1];
      var wxh = ndarray(new Uint8Array(pixels.data), shape, stride, 0);
      var hxw = wxh.transpose(1, 0);

      if (isGrayscale(hxw)) {
        hxw = hxw.pick(null, null, 0);
      }
      return new NdArray(hxw);
    }