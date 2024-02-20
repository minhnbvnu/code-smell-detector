function makePowerOfTwo(image) {

    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

      if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

      _canvas.width = _Math.floorPowerOfTwo(image.width);
      _canvas.height = _Math.floorPowerOfTwo(image.height);

      var context = _canvas.getContext('2d');
      context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

      console.warn('THREE.WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height);

      return _canvas;

    }

    return image;

  }