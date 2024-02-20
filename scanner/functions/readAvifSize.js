function readAvifSize(parser, sandbox) {
  parser._bytes(8, function (data) {
    sandbox.offset += 8;
    var size = readUInt32BE(data, 0) - 8;
    var type = String.fromCharCode.apply(null, data.slice(4, 8));

    if (type === 'mdat') {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    } else if (size < 0) {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    } else if (type === 'meta' && size > 0) {
      parser._bytes(size, function (data) {
        sandbox.offset += size;
        var imgSize = miaf.readSizeFromMeta(data);

        if (!imgSize) {
          parser._skipBytes(Infinity);
          parser.push(null);
          return;
        }

        var result = {
          width:    imgSize.width,
          height:   imgSize.height,
          type:     sandbox.fileType.type,
          mime:     sandbox.fileType.mime,
          wUnits:   'px',
          hUnits:   'px'
        };

        if (imgSize.variants.length > 1) {
          result.variants = imgSize.variants;
        }

        if (imgSize.orientation) {
          result.orientation = imgSize.orientation;
        }

        sandbox.exif_location = imgSize.exif_location;

        readExifOrientation(parser, sandbox, function (orientation) {
          if (orientation > 0) result.orientation = orientation;

          parser._skipBytes(Infinity);
          parser.push(result);
          parser.push(null);
        });
      });
    } else {
      safeSkip(parser, size, function () {
        sandbox.offset += size;
        readAvifSize(parser, sandbox);
      });
    }
  });
}