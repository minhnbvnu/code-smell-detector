function applyRotate(image, type, angle) {
      var canvas = create$5(image.width, image.height);
      var context = get2dContext(canvas);
      var translateX = 0;
      var translateY = 0;
      angle = angle < 0 ? 360 + angle : angle;
      if (angle === 90 || angle === 270) {
        resize(canvas, canvas.height, canvas.width);
      }
      if (angle === 90 || angle === 180) {
        translateX = canvas.width;
      }
      if (angle === 270 || angle === 180) {
        translateY = canvas.height;
      }
      context.translate(translateX, translateY);
      context.rotate(angle * Math.PI / 180);
      context.drawImage(image, 0, 0);
      return fromCanvas(canvas, type);
    }