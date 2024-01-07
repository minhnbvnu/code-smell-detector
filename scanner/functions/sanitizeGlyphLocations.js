function sanitizeGlyphLocations(loca, glyf, numGlyphs, isGlyphLocationsLong, hintsValid, dupFirstEntry, maxSizeOfInstructions) {
        var itemSize, itemDecode, itemEncode;

        if (isGlyphLocationsLong) {
          itemSize = 4;

          itemDecode = function fontItemDecodeLong(data, offset) {
            return data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3];
          };

          itemEncode = function fontItemEncodeLong(data, offset, value) {
            data[offset] = value >>> 24 & 0xff;
            data[offset + 1] = value >> 16 & 0xff;
            data[offset + 2] = value >> 8 & 0xff;
            data[offset + 3] = value & 0xff;
          };
        } else {
          itemSize = 2;

          itemDecode = function fontItemDecode(data, offset) {
            return data[offset] << 9 | data[offset + 1] << 1;
          };

          itemEncode = function fontItemEncode(data, offset, value) {
            data[offset] = value >> 9 & 0xff;
            data[offset + 1] = value >> 1 & 0xff;
          };
        }

        var numGlyphsOut = dupFirstEntry ? numGlyphs + 1 : numGlyphs;
        var locaDataSize = itemSize * (1 + numGlyphsOut);
        var locaData = new Uint8Array(locaDataSize);
        locaData.set(loca.data.subarray(0, locaDataSize));
        loca.data = locaData;
        var oldGlyfData = glyf.data;
        var oldGlyfDataLength = oldGlyfData.length;
        var newGlyfData = new Uint8Array(oldGlyfDataLength);
        var i, j;
        const locaEntries = [];

        for (i = 0, j = 0; i < numGlyphs + 1; i++, j += itemSize) {
          let offset = itemDecode(locaData, j);

          if (offset > oldGlyfDataLength) {
            offset = oldGlyfDataLength;
          }

          locaEntries.push({
            index: i,
            offset,
            endOffset: 0
          });
        }

        locaEntries.sort((a, b) => {
          return a.offset - b.offset;
        });

        for (i = 0; i < numGlyphs; i++) {
          locaEntries[i].endOffset = locaEntries[i + 1].offset;
        }

        locaEntries.sort((a, b) => {
          return a.index - b.index;
        });
        var missingGlyphs = Object.create(null);
        var writeOffset = 0;
        itemEncode(locaData, 0, writeOffset);

        for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
          var glyphProfile = sanitizeGlyph(oldGlyfData, locaEntries[i].offset, locaEntries[i].endOffset, newGlyfData, writeOffset, hintsValid);
          var newLength = glyphProfile.length;

          if (newLength === 0) {
            missingGlyphs[i] = true;
          }

          if (glyphProfile.sizeOfInstructions > maxSizeOfInstructions) {
            maxSizeOfInstructions = glyphProfile.sizeOfInstructions;
          }

          writeOffset += newLength;
          itemEncode(locaData, j, writeOffset);
        }

        if (writeOffset === 0) {
          var simpleGlyph = new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0]);

          for (i = 0, j = itemSize; i < numGlyphsOut; i++, j += itemSize) {
            itemEncode(locaData, j, simpleGlyph.length);
          }

          glyf.data = simpleGlyph;
        } else if (dupFirstEntry) {
          var firstEntryLength = itemDecode(locaData, itemSize);

          if (newGlyfData.length > firstEntryLength + writeOffset) {
            glyf.data = newGlyfData.subarray(0, firstEntryLength + writeOffset);
          } else {
            glyf.data = new Uint8Array(firstEntryLength + writeOffset);
            glyf.data.set(newGlyfData.subarray(0, writeOffset));
          }

          glyf.data.set(newGlyfData.subarray(0, firstEntryLength), writeOffset);
          itemEncode(loca.data, locaData.length - itemSize, writeOffset + firstEntryLength);
        } else {
          glyf.data = newGlyfData.subarray(0, writeOffset);
        }

        return {
          missingGlyphs,
          maxSizeOfInstructions
        };
      }