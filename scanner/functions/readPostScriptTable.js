function readPostScriptTable(post, properties, maxpNumGlyphs) {
        var start = (font.start ? font.start : 0) + post.offset;
        font.pos = start;

        var length = post.length, end = start + length;
        var version = font.getInt32();
        // skip rest to the tables
        font.getBytes(28);

        var glyphNames;
        var valid = true;
        var i;

        switch (version) {
          case 0x00010000:
            glyphNames = MacStandardGlyphOrdering;
            break;
          case 0x00020000:
            var numGlyphs = font.getUint16();
            if (numGlyphs !== maxpNumGlyphs) {
              valid = false;
              break;
            }
            var glyphNameIndexes = [];
            for (i = 0; i < numGlyphs; ++i) {
              var index = font.getUint16();
              if (index >= 32768) {
                valid = false;
                break;
              }
              glyphNameIndexes.push(index);
            }
            if (!valid) {
              break;
            }
            var customNames = [];
            var strBuf = [];
            while (font.pos < end) {
              var stringLength = font.getByte();
              strBuf.length = stringLength;
              for (i = 0; i < stringLength; ++i) {
                strBuf[i] = String.fromCharCode(font.getByte());
              }
              customNames.push(strBuf.join(''));
            }
            glyphNames = [];
            for (i = 0; i < numGlyphs; ++i) {
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
            valid = false;
            break;
        }
        properties.glyphNames = glyphNames;
        return valid;
      }