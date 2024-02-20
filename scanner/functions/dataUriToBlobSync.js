function dataUriToBlobSync(uri) {
      var data = uri.split(',');
      var matches = /data:([^;]+)/.exec(data[0]);
      if (!matches) {
        return Option.none();
      }
      var mimetype = matches[1];
      var base64 = data[1];
      var sliceSize = 1024;
      var byteCharacters = domGlobals.atob(base64);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return Option.some(new domGlobals.Blob(byteArrays, { type: mimetype }));
    }