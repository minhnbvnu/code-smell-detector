function applyCrop(image, type, x, y, w, h) {
      var canvas = create$5(w, h);
      var context = get2dContext(canvas);
      context.drawImage(image, -x, -y);
      return fromCanvas(canvas, type);
    }