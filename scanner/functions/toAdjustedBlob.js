function toAdjustedBlob(type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToBlob(canvas, type, quality);
        });
      }