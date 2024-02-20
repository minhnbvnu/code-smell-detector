function clampToMaxSize(image, maxSize) {

    if (image.width > maxSize || image.height > maxSize) {

      if ('data' in image) {

        console.warn('THREE.WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
        return;

      }

      // Warning: Scaling through the canvas will only work with images that use
      // premultiplied alpha.

      var scale = maxSize / Math.max(image.width, image.height);

      var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      canvas.width = Math.floor(image.width * scale);
      canvas.height = Math.floor(image.height * scale);

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

      console.warn('THREE.WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height);

      return canvas;

    }

    return image;

  }