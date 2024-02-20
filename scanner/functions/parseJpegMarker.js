function parseJpegMarker(parser, sandbox, callback) {
  var start = sandbox.start;
  sandbox.start = false;

  parser._bytes(1, function (data) {
    if (data[0] !== 0xFF) {
      // not a JPEG marker
      if (start) {
        // expect JPEG file to start with `FFD8 FFE0`, `FFD8 FFE2` or `FFD8 FFE1`,
        // don't allow garbage before second marker
        callback();
      } else {
        // skip until we see 0xFF, see https://github.com/nodeca/probe-image-size/issues/68
        parseJpegMarker(parser, sandbox, callback);
      }
      return;
    }

    parseJpegMarker_afterFF(parser, callback);
  });
}