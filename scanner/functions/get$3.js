function get$3(x, y, img) {
      if (img.isRemote) throw "Image is loaded remotely. Cannot get x,y.";
      var offset = y * img.width * 4 + x * 4,
        data = img.imageData.data;
      return (data[offset + 3] & 255) << 24 | (data[offset] & 255) << 16 | (data[offset + 1] & 255) << 8 | data[offset + 2] & 255
    }