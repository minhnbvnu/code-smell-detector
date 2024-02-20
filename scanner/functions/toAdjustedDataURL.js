function toAdjustedDataURL(type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToDataURL(canvas, type, quality);
        });
      }