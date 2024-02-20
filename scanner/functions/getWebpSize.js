function getWebpSize(parser, sandbox) {
  if (sandbox.fileLength - 8 <= sandbox.offset) {
    parser._skipBytes(Infinity);

    if (sandbox.result) {
      var result = sandbox.result;

      if (sandbox.exif_orientation > 0) {
        result.orientation = sandbox.exif_orientation;
      }

      parser.push(result);
    }

    parser.push(null);
    return;
  }

  parser._bytes(4 - sandbox.bufferedChunkHeader.length, function (data) {
    sandbox.offset += 4 - sandbox.bufferedChunkHeader.length;
    var header = sandbox.bufferedChunkHeader + String.fromCharCode.apply(null, data);

    // after each chunk of odd size there should be 0 byte of padding, skip those
    header = header.replace(/^\0+/, '');

    if (header.length < 4) {
      sandbox.bufferedChunkHeader = header;
      getWebpSize(parser, sandbox);
      return;
    }

    sandbox.bufferedChunkHeader = '';

    parser._bytes(4, function (data) {
      sandbox.offset += 4;
      var length = data.readUInt32LE(0);

      if (header === 'VP8 ' && length >= 10) {
        parseVP8(parser, length, sandbox);
      } else if (header === 'VP8L' && length >= 5) {
        parseVP8L(parser, length, sandbox);
      } else if (header === 'VP8X' && length >= 10) {
        parseVP8X(parser, length, sandbox);
      } else if (header === 'EXIF' && length >= 4) {
        parseExif(parser, length, sandbox);
      } else {
        safeSkip(parser, length, function () {
          sandbox.offset += length;
          getWebpSize(parser, sandbox);
        });
      }
    });
  });
}