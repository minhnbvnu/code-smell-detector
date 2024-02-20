function applyFlip(image, type, axis) {
      var canvas = create$5(image.width, image.height);
      var context = get2dContext(canvas);
      if (axis === 'v') {
        context.scale(1, -1);
        context.drawImage(image, 0, -canvas.height);
      } else {
        context.scale(-1, 1);
        context.drawImage(image, -canvas.width, 0);
      }
      return fromCanvas(canvas, type);
    }