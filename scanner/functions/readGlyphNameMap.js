function readGlyphNameMap(post, properties) {
        var start = (font.start ? font.start : 0) + post.offset;
        font.pos = start;

        var length = post.length, end = start + length;
        var version = int32(font.getBytes(4));
        // skip rest to the tables
        font.getBytes(28);

        var glyphNames;
        switch (version) {
          case 0x00010000:
            glyphNames = MacStandardGlyphOrdering;
            break;
          case 0x00020000:
            var numGlyphs = int16(font.getBytes(2));
            var glyphNameIndexes = [];
            for (var i = 0; i < numGlyphs; ++i)
              glyphNameIndexes.push(int16(font.getBytes(2)));
            var customNames = [];
            while (font.pos < end) {
              var stringLength = font.getByte();
              var string = '';
              for (var i = 0; i < stringLength; ++i)
                string += font.getChar();
              customNames.push(string);
            }
            glyphNames = [];
            for (var i = 0; i < numGlyphs; ++i) {
              var j = glyphNameIndexes[i];
              if (j < 258) {
                glyphNames.push(MacStandardGlyphOrdering[j]);
                continue;
              }
              glyphNames.push(customNames[j - 258]);
            }
            break;
          case 0x00030000:
            break;
          default:
            warn('Unknown/unsupported post table version ' + version);
            break;
        }
        properties.glyphNames = glyphNames;
      }