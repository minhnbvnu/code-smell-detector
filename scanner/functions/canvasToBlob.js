function canvasToBlob(canvas, type, quality) {
      type = type || 'image/png';
      if (domGlobals.HTMLCanvasElement.prototype.toBlob) {
        return new Promise$1(function (resolve, reject) {
          canvas.toBlob(function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject();
            }
          }, type, quality);
        });
      } else {
        return dataUriToBlob(canvas.toDataURL(type, quality));
      }
    }