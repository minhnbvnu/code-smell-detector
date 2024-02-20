function readCmapTable(cmap, font, isSymbolicFont) {
        var segment;
        var start = (font.start ? font.start : 0) + cmap.offset;
        font.pos = start;

        var version = font.getUint16();
        var numTables = font.getUint16();

        var potentialTable;
        var canBreak = false;
        // There's an order of preference in terms of which cmap subtable to
        // use:
        // - non-symbolic fonts the preference is a 3,1 table then a 1,0 table
        // - symbolic fonts the preference is a 3,0 table then a 1,0 table
        // The following takes advantage of the fact that the tables are sorted
        // to work.
        for (var i = 0; i < numTables; i++) {
          var platformId = font.getUint16();
          var encodingId = font.getUint16();
          var offset = font.getInt32() >>> 0;
          var useTable = false;

          if (platformId === 0 && encodingId === 0) {
            useTable = true;
            // Continue the loop since there still may be a higher priority
            // table.
          } else if (platformId === 1 && encodingId === 0) {
            useTable = true;
            // Continue the loop since there still may be a higher priority
            // table.
          } else if (platformId === 3 && encodingId === 1 &&
                     (!isSymbolicFont || !potentialTable)) {
            useTable = true;
            if (!isSymbolicFont) {
              canBreak = true;
            }
          } else if (isSymbolicFont && platformId === 3 && encodingId === 0) {
            useTable = true;
            canBreak = true;
          }

          if (useTable) {
            potentialTable = {
              platformId: platformId,
              encodingId: encodingId,
              offset: offset
            };
          }
          if (canBreak) {
            break;
          }
        }

        if (!potentialTable) {
          warn('Could not find a preferred cmap table.');
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        font.pos = start + potentialTable.offset;
        var format = font.getUint16();
        var length = font.getUint16();
        var language = font.getUint16();

        var hasShortCmap = false;
        var mappings = [];
        var j, glyphId;

        // TODO(mack): refactor this cmap subtable reading logic out
        if (format === 0) {
          for (j = 0; j < 256; j++) {
            var index = font.getByte();
            if (!index) {
              continue;
            }
            mappings.push({
              charCode: j,
              glyphId: index
            });
          }
          hasShortCmap = true;
        } else if (format === 4) {
          // re-creating the table in format 4 since the encoding
          // might be changed
          var segCount = (font.getUint16() >> 1);
          font.getBytes(6); // skipping range fields
          var segIndex, segments = [];
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments.push({ end: font.getUint16() });
          }
          font.getUint16();
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].start = font.getUint16();
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].delta = font.getUint16();
          }

          var offsetsCount = 0;
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            var rangeOffset = font.getUint16();
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
          for (j = 0; j < offsetsCount; j++) {
            offsets.push(font.getUint16());
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            start = segment.start;
            var end = segment.end;
            var delta = segment.delta;
            offsetIndex = segment.offsetIndex;

            for (j = start; j <= end; j++) {
              if (j === 0xFFFF) {
                continue;
              }

              glyphId = (offsetIndex < 0 ?
                         j : offsets[offsetIndex + j - start]);
              glyphId = (glyphId + delta) & 0xFFFF;
              if (glyphId === 0) {
                continue;
              }
              mappings.push({
                charCode: j,
                glyphId: glyphId
              });
            }
          }
        } else if (format === 6) {
          // Format 6 is a 2-bytes dense mapping, which means the font data
          // lives glue together even if they are pretty far in the unicode
          // table. (This looks weird, so I can have missed something), this
          // works on Linux but seems to fails on Mac so let's rewrite the
          // cmap table to a 3-1-4 style
          var firstCode = font.getUint16();
          var entryCount = font.getUint16();

          for (j = 0; j < entryCount; j++) {
            glyphId = font.getUint16();
            var charCode = firstCode + j;

            mappings.push({
              charCode: charCode,
              glyphId: glyphId
            });
          }
        } else {
          error('cmap table has unsupported format: ' + format);
        }

        // removing duplicate entries
        mappings.sort(function (a, b) {
          return a.charCode - b.charCode;
        });
        for (i = 1; i < mappings.length; i++) {
          if (mappings[i - 1].charCode === mappings[i].charCode) {
            mappings.splice(i, 1);
            i--;
          }
        }

        return {
          platformId: potentialTable.platformId,
          encodingId: potentialTable.encodingId,
          mappings: mappings,
          hasShortCmap: hasShortCmap
        };
      }