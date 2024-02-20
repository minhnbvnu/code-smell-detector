function readCMapTable(cmap, font) {
        var start = (font.start ? font.start : 0) + cmap.offset;
        font.pos = start;

        var version = int16(font.getBytes(2));
        var numRecords = int16(font.getBytes(2));

        var records = [];
        for (var i = 0; i < numRecords; i++) {
          records.push({
            platformID: int16(font.getBytes(2)),
            encodingID: int16(font.getBytes(2)),
            offset: int32(font.getBytes(4))
          });
        }

        // Check that table are sorted by platformID then encodingID,
        records.sort(function fontReadCMapTableSort(a, b) {
          return ((a.platformID << 16) + a.encodingID) -
                 ((b.platformID << 16) + b.encodingID);
        });

        var tables = [records[0]];
        for (var i = 1; i < numRecords; i++) {
          // The sanitizer will drop the font if 2 tables have the same
          // platformID and the same encodingID, this will be correct for
          // most cases but if the font has been made for Mac it could
          // exist a few platformID: 1, encodingID: 0 but with a different
          // language field and that's correct. But the sanitizer does not
          // seem to support this case.
          var current = records[i];
          var previous = records[i - 1];
          if (((current.platformID << 16) + current.encodingID) <=
             ((previous.platformID << 16) + previous.encodingID))
                continue;
          tables.push(current);
        }

        var missing = numRecords - tables.length;
        if (missing) {
          numRecords = tables.length;
          var data = string16(version) + string16(numRecords);

          for (var i = 0; i < numRecords; i++) {
            var table = tables[i];
            data += string16(table.platformID) +
                    string16(table.encodingID) +
                    string32(table.offset);
          }

          for (var i = 0, ii = data.length; i < ii; i++)
            cmap.data[i] = data.charCodeAt(i);
        }

        for (var i = 0; i < numRecords; i++) {
          var table = tables[i];
          font.pos = start + table.offset;

          var format = int16(font.getBytes(2));
          var length = int16(font.getBytes(2));
          var language = int16(font.getBytes(2));

          if (format == 0) {
            // Characters below 0x20 are controls characters that are hardcoded
            // into the platform so if some characters in the font are assigned
            // under this limit they will not be displayed so let's rewrite the
            // CMap.
            var glyphs = [];
            var ids = [];
            for (var j = 0; j < 256; j++) {
              var index = font.getByte();
              if (index) {
                glyphs.push({ unicode: j, code: j });
                ids.push(index);
              }
            }
            return {
              glyphs: glyphs,
              ids: ids,
              hasShortCmap: true
            };
          } else if (format == 4) {
            // re-creating the table in format 4 since the encoding
            // might be changed
            var segCount = (int16(font.getBytes(2)) >> 1);
            font.getBytes(6); // skipping range fields
            var segIndex, segments = [];
            for (segIndex = 0; segIndex < segCount; segIndex++) {
              segments.push({ end: int16(font.getBytes(2)) });
            }
            font.getBytes(2);
            for (segIndex = 0; segIndex < segCount; segIndex++) {
              segments[segIndex].start = int16(font.getBytes(2));
            }

            for (segIndex = 0; segIndex < segCount; segIndex++) {
              segments[segIndex].delta = int16(font.getBytes(2));
            }

            var offsetsCount = 0;
            for (segIndex = 0; segIndex < segCount; segIndex++) {
              var segment = segments[segIndex];
              var rangeOffset = int16(font.getBytes(2));
              if (!rangeOffset) {
                segment.offsetIndex = -1;
                continue;
              }

              var offsetIndex = (rangeOffset >> 1) - (segCount - segIndex);
              segment.offsetIndex = offsetIndex;
              offsetsCount = Math.max(offsetsCount, offsetIndex +
                segment.end - segment.start + 1);
            }

            var offsets = [];
            for (var j = 0; j < offsetsCount; j++)
              offsets.push(int16(font.getBytes(2)));

            var glyphs = [], ids = [];

            for (segIndex = 0; segIndex < segCount; segIndex++) {
              var segment = segments[segIndex];
              var start = segment.start, end = segment.end;
              var delta = segment.delta, offsetIndex = segment.offsetIndex;

              for (var j = start; j <= end; j++) {
                if (j == 0xFFFF)
                  continue;

                var glyphCode = offsetIndex < 0 ? j :
                  offsets[offsetIndex + j - start];
                glyphCode = (glyphCode + delta) & 0xFFFF;
                if (glyphCode == 0)
                  continue;

                glyphs.push({ unicode: j, code: j });
                ids.push(glyphCode);
              }
            }

            return {
              glyphs: glyphs,
              ids: ids
            };
          } else if (format == 6) {
            // Format 6 is a 2-bytes dense mapping, which means the font data
            // lives glue together even if they are pretty far in the unicode
            // table. (This looks weird, so I can have missed something), this
            // works on Linux but seems to fails on Mac so let's rewrite the
            // cmap table to a 3-1-4 style
            var firstCode = int16(font.getBytes(2));
            var entryCount = int16(font.getBytes(2));

            var glyphs = [];
            var ids = [];
            for (var j = 0; j < entryCount; j++) {
              var glyphCode = int16(font.getBytes(2));
              var code = firstCode + j;

              glyphs.push({ unicode: code, code: code });
              ids.push(glyphCode);
            }

            return {
              glyphs: glyphs,
              ids: ids
            };
          }
        }
        error('Unsupported cmap table format');
      }