function readExifOrientation(parser, sandbox, callback) {
  if (!sandbox.exif_location || sandbox.exif_location.offset <= sandbox.offset) {
    callback(0);
    return;
  }

  parser._skipBytes(sandbox.exif_location.offset - sandbox.offset, function () {
    sandbox.offset = sandbox.exif_location.offset;

    parser._bytes(4, function (data) {
      sandbox.offset += 4;
      var sig_offset = readUInt32BE(data, 0);

      safeSkip(parser, sig_offset, function () {
        sandbox.offset += sig_offset;
        var byteCount = sandbox.exif_location.length - sig_offset - 4;

        if (byteCount <= 0) {
          callback(0);
          return;
        }

        parser._bytes(byteCount, function (exif_data) {
          sandbox.offset += byteCount;
          callback(exif.get_orientation(exif_data));
        });
      });
    });
  });
}