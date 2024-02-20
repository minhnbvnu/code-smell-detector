function parseJpegMarker_afterFF(parser, callback) {
  parser._bytes(1, function (data) {
    var code = data[0];

    if (code === 0xFF) {
      // padding byte, skip it
      parseJpegMarker_afterFF(parser, callback);
      return;
    }

    // standalone markers, according to JPEG 1992,
    // http://www.w3.org/Graphics/JPEG/itu-t81.pdf, see Table B.1
    if ((0xD0 <= code && code <= 0xD9) || code === 0x01) {
      callback(code, 0);
      return;
    }

    // the rest of the unreserved markers
    if (0xC0 <= code && code <= 0xFE) {
      parser._bytes(2, function (length) {
        callback(code, length.readUInt16BE(0) - 2);
      });
      return;
    }

    // unknown markers
    callback();
  });
}