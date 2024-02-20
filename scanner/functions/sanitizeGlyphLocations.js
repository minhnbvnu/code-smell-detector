function sanitizeGlyphLocations(loca, glyf, numGlyphs,
                                      isGlyphLocationsLong, hintsValid,
                                      dupFirstEntry) {
        var itemSize, itemDecode, itemEncode;
        if (isGlyphLocationsLong) {
          itemSize = 4;
          itemDecode = function fontItemDecodeLong(data, offset) {
            return (data[offset] << 24) | (data[offset + 1] << 16) |
                   (data[offset + 2] << 8) | data[offset + 3];
          };
          itemEncode = function fontItemEncodeLong(data, offset, value) {
            data[offset] = (value >>> 24) & 0xFF;
            data[offset + 1] = (value >> 16) & 0xFF;
            data[offset + 2] = (value >> 8) & 0xFF;
            data[offset + 3] = value & 0xFF;
          };
        } else {
          itemSize = 2;
          itemDecode = function fontItemDecode(data, offset) {
            return (data[offset] << 9) | (data[offset + 1] << 1);
          };
          itemEncode = function fontItemEncode(data, offset, value) {
            data[offset] = (value >> 9) & 0xFF;
            data[offset + 1] = (value >> 1) & 0xFF;
          };
        }
        var locaData = loca.data;
        var locaDataSize = itemSize * (1 + numGlyphs);
        // is loca.data too short or long?
        if (locaData.length !== locaDataSize) {
          locaData = new Uint8Array(locaDataSize);
          locaData.set(loca.data.subarray(0, locaDataSize));
          loca.data = locaData;
        }
        // removing the invalid glyphs
        var oldGlyfData = glyf.data;
        var oldGlyfDataLength = oldGlyfData.length;
        var newGlyfData = new Uint8Array(oldGlyfDataLength);
        var startOffset = itemDecode(locaData, 0);
        var writeOffset = 0;
        var missingGlyphData = {};
        itemEncode(locaData, 0, writeOffset);
        var i, j;
        for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
          var endOffset = itemDecode(locaData, j);
          if (endOffset > oldGlyfDataLength &&
              ((oldGlyfDataLength + 3) & ~3) === endOffset) {
            // Aspose breaks fonts by aligning the glyphs to the qword, but not
            // the glyf table size, which makes last glyph out of range.
            endOffset = oldGlyfDataLength;
          }
          if (endOffset > oldGlyfDataLength) {
            // glyph end offset points outside glyf data, rejecting the glyph
            itemEncode(locaData, j, writeOffset);
            startOffset = endOffset;
            continue;
          }

          if (startOffset === endOffset) {
            missingGlyphData[i] = true;
          }

          var newLength = sanitizeGlyph(oldGlyfData, startOffset, endOffset,
                                        newGlyfData, writeOffset, hintsValid);
          writeOffset += newLength;
          itemEncode(locaData, j, writeOffset);
          startOffset = endOffset;
        }

        if (writeOffset === 0) {
          // glyf table cannot be empty -- redoing the glyf and loca tables
          // to have single glyph with one point
          var simpleGlyph = new Uint8Array(
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0]);
          for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
            itemEncode(locaData, j, simpleGlyph.length);
          }
          glyf.data = simpleGlyph;
          return missingGlyphData;
        }

        if (dupFirstEntry) {
          var firstEntryLength = itemDecode(locaData, itemSize);
          if (newGlyfData.length > firstEntryLength + writeOffset) {
            glyf.data = newGlyfData.subarray(0, firstEntryLength + writeOffset);
          } else {
            glyf.data = new Uint8Array(firstEntryLength + writeOffset);
            glyf.data.set(newGlyfData.subarray(0, writeOffset));
          }
          glyf.data.set(newGlyfData.subarray(0, firstEntryLength), writeOffset);
          itemEncode(loca.data, locaData.length - itemSize,
                     writeOffset + firstEntryLength);
        } else {
          glyf.data = newGlyfData.subarray(0, writeOffset);
        }
        return missingGlyphData;
      }