function blobToCanvas(blob) {
      return blobToImage(blob).then(function (image) {
        revokeImageUrl(image);
        var canvas = create$5(getWidth(image), getHeight(image));
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0);
        return canvas;
      });
    }