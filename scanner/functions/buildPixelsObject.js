function buildPixelsObject(pImage) {
      return {
        getLength: function(aImg) {
          return function() {
            if (aImg.isRemote) throw "Image is loaded remotely. Cannot get length.";
            else return aImg.imageData.data.length ? aImg.imageData.data.length / 4 : 0
          }
        }(pImage),
        getPixel: function(aImg) {
          return function(i) {
            var offset = i * 4,
              data = aImg.imageData.data;
            if (aImg.isRemote) throw "Image is loaded remotely. Cannot get pixels.";
            return (data[offset + 3] & 255) << 24 | (data[offset] & 255) << 16 | (data[offset + 1] & 255) << 8 | data[offset + 2] & 255
          }
        }(pImage),
        setPixel: function(aImg) {
          return function(i, c) {
            var offset = i * 4,
              data = aImg.imageData.data;
            if (aImg.isRemote) throw "Image is loaded remotely. Cannot set pixel.";
            data[offset + 0] = (c >> 16) & 255;
            data[offset + 1] = (c >> 8) & 255;
            data[offset + 2] = c & 255;
            data[offset + 3] = (c >> 24) & 255;
            aImg.__isDirty = true
          }
        }(pImage),
        toArray: function(aImg) {
          return function() {
            var arr = [],
              data = aImg.imageData.data,
              length = aImg.width * aImg.height;
            if (aImg.isRemote) throw "Image is loaded remotely. Cannot get pixels.";
            for (var i = 0, offset = 0; i < length; i++, offset += 4) arr.push((data[offset + 3] & 255) << 24 | (data[offset] & 255) << 16 | (data[offset + 1] & 255) << 8 | data[offset + 2] & 255);
            return arr
          }
        }(pImage),
        set: function(aImg) {
          return function(arr) {
            var offset, data, c;
            if (this.isRemote) throw "Image is loaded remotely. Cannot set pixels.";
            data = aImg.imageData.data;
            for (var i = 0, aL = arr.length; i < aL; i++) {
              c = arr[i];
              offset = i * 4;
              data[offset + 0] = (c >> 16) & 255;
              data[offset + 1] = (c >> 8) & 255;
              data[offset + 2] = c & 255;
              data[offset + 3] = (c >> 24) & 255
            }
            aImg.__isDirty = true
          }
        }(pImage)
      }
    }