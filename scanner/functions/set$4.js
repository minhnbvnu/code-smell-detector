function set$4(x, y, obj, img) {
      if (img.isRemote) throw "Image is loaded remotely. Cannot set x,y.";
      var c = p.color.toArray(obj);
      var offset = y * img.width * 4 + x * 4;
      var data = img.imageData.data;
      data[offset] = c[0];
      data[offset + 1] = c[1];
      data[offset + 2] = c[2];
      data[offset + 3] = c[3]
    }