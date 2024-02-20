function handleImageData(handler, xref, res, image) {
    if (image instanceof JpegStream && image.isNativelyDecodable(xref, res)) {
      // For natively supported jpegs send them to the main thread for decoding.
      var dict = image.dict;
      var colorSpace = dict.get('ColorSpace', 'CS');
      colorSpace = ColorSpace.parse(colorSpace, xref, res);
      var numComps = colorSpace.numComps;
      var decodePromise = handler.sendWithPromise('JpegDecode',
                                                  [image.getIR(), numComps]);
      return decodePromise.then(function (message) {
        var data = message.data;
        return new Stream(data, 0, data.length, image.dict);
      });
    } else {
      return Promise.resolve(image);
    }
  }