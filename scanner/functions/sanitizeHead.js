function sanitizeHead(head, numGlyphs, locaLength) {
        var data = head.data;
        var version = int32(data[0], data[1], data[2], data[3]);

        if (version >> 16 !== 1) {
          (0, _util.info)("Attempting to fix invalid version in head table: " + version);
          data[0] = 0;
          data[1] = 1;
          data[2] = 0;
          data[3] = 0;
        }

        var indexToLocFormat = int16(data[50], data[51]);

        if (indexToLocFormat < 0 || indexToLocFormat > 1) {
          (0, _util.info)("Attempting to fix invalid indexToLocFormat in head table: " + indexToLocFormat);
          var numGlyphsPlusOne = numGlyphs + 1;

          if (locaLength === numGlyphsPlusOne << 1) {
            data[50] = 0;
            data[51] = 0;
          } else if (locaLength === numGlyphsPlusOne << 2) {
            data[50] = 0;
            data[51] = 1;
          } else {
            throw new _util.FormatError("Could not fix indexToLocFormat: " + indexToLocFormat);
          }
        }
      }