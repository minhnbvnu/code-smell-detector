function get$5(x, y, w, h, img) {
      if (img.isRemote) throw "Image is loaded remotely. Cannot get x,y,w,h.";
      var c = new PImage(w, h, 2),
        cData = c.imageData.data,
        imgWidth = img.width,
        imgHeight = img.height,
        imgData = img.imageData.data;
      var startRow = Math.max(0, -y),
        startColumn = Math.max(0, -x),
        stopRow = Math.min(h, imgHeight - y),
        stopColumn = Math.min(w, imgWidth - x);
      for (var i = startRow; i < stopRow; ++i) {
        var sourceOffset = ((y + i) * imgWidth + (x + startColumn)) * 4;
        var targetOffset = (i * w + startColumn) * 4;
        for (var j = startColumn; j < stopColumn; ++j) {
          cData[targetOffset++] = imgData[sourceOffset++];
          cData[targetOffset++] = imgData[sourceOffset++];
          cData[targetOffset++] = imgData[sourceOffset++];
          cData[targetOffset++] = imgData[sourceOffset++]
        }
      }
      c.__isDirty = true;
      return c
    }