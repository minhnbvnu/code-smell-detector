function parseExif(parser, length, sandbox) {
  parser._bytes(length, function (data) {
    // exif is the last chunk we care about, stop after it
    sandbox.offset = Infinity;
    sandbox.exif_orientation = exif.get_orientation(data);

    getWebpSize(parser, sandbox);
  });
}