function _scale(image, wRatio, hRatio) {
      return new Promise$1(function (resolve) {
        var sW = getWidth(image);
        var sH = getHeight(image);
        var dW = Math.floor(sW * wRatio);
        var dH = Math.floor(sH * hRatio);
        var canvas = create$5(dW, dH);
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);
        resolve(canvas);
      });
    }