function readCmapTable(cmap, file, isSymbolicFont, hasEncoding) {
        if (!cmap) {
          (0, _util.warn)("No cmap table available.");
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        var segment;
        var start = (file.start ? file.start : 0) + cmap.offset;
        file.pos = start;
        file.skip(2);
        var numTables = file.getUint16();
        var potentialTable;
        var canBreak = false;

        for (var i = 0; i < numTables; i++) {
          var platformId = file.getUint16();
          var encodingId = file.getUint16();
          var offset = file.getInt32() >>> 0;
          var useTable = false;

          if (potentialTable && potentialTable.platformId === platformId && potentialTable.encodingId === encodingId) {
            continue;
          }

          if (platformId === 0 && (encodingId === 0 || encodingId === 1 || encodingId === 3)) {
            useTable = true;
          } else if (platformId === 1 && encodingId === 0) {
            useTable = true;
          } else if (platformId === 3 && encodingId === 1 && (hasEncoding || !potentialTable)) {
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
              platformId,
              encodingId,
              offset
            };
          }

          if (canBreak) {
            break;
          }
        }

        if (potentialTable) {
          file.pos = start + potentialTable.offset;
        }

        if (!potentialTable || file.peekByte() === -1) {
          (0, _util.warn)("Could not find a preferred cmap table.");
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        var format = file.getUint16();
        file.skip(2 + 2);
        var hasShortCmap = false;
        var mappings = [];
        var j, glyphId;

        if (format === 0) {
          for (j = 0; j < 256; j++) {
            var index = file.getByte();

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
          var segCount = file.getUint16() >> 1;
          file.skip(6);
          var segIndex,
              segments = [];

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments.push({
              end: file.getUint16()
            });
          }

          file.skip(2);

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].start = file.getUint16();
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].delta = file.getUint16();
          }

          var offsetsCount = 0;

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            var rangeOffset = file.getUint16();

            if (!rangeOffset) {
              segment.offsetIndex = -1;
              continue;
            }

            var offsetIndex = (rangeOffset >> 1) - (segCount - segIndex);
            segment.offsetIndex = offsetIndex;
            offsetsCount = Math.max(offsetsCount, offsetIndex + segment.end - segment.start + 1);
          }

          var offsets = [];

          for (j = 0; j < offsetsCount; j++) {
            offsets.push(file.getUint16());
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            start = segment.start;
            var end = segment.end;
            var delta = segment.delta;
            offsetIndex = segment.offsetIndex;

            for (j = start; j <= end; j++) {
              if (j === 0xffff) {
                continue;
              }

              glyphId = offsetIndex < 0 ? j : offsets[offsetIndex + j - start];
              glyphId = glyphId + delta & 0xffff;
              mappings.push({
                charCode: j,
                glyphId
              });
            }
          }
        } else if (format === 6) {
          var firstCode = file.getUint16();
          var entryCount = file.getUint16();

          for (j = 0; j < entryCount; j++) {
            glyphId = file.getUint16();
            var charCode = firstCode + j;
            mappings.push({
              charCode,
              glyphId
            });
          }
        } else {
          (0, _util.warn)("cmap table has unsupported format: " + format);
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

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
          mappings,
          hasShortCmap
        };
      }