function getCanvasData(obj, w, h) {
      var canvasData = canvasDataCache.shift();
      if (canvasData === undef) {
        canvasData = {};
        canvasData.canvas = document.createElement("canvas");
        canvasData.context = canvasData.canvas.getContext("2d")
      }
      canvasDataCache.push(canvasData);
      var canvas = canvasData.canvas,
        context = canvasData.context,
        width = w || obj.width,
        height = h || obj.height;
      canvas.width = width;
      canvas.height = height;
      if (!obj) context.clearRect(0, 0, width, height);
      else if ("data" in obj) context.putImageData(obj, 0, 0);
      else {
        context.clearRect(0, 0, width, height);
        context.drawImage(obj, 0, 0, width, height)
      }
      return canvasData
    }