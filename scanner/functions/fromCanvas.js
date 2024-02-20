function fromCanvas(canvas, type) {
      return canvasToBlob(canvas, type).then(function (blob) {
        return create$6(Promise$1.resolve(canvas), blob, canvas.toDataURL());
      });
    }