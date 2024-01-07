function sanitizeMetrics(file, header, metrics, numGlyphs, dupFirstEntry) {
        if (!header) {
          if (metrics) {
            metrics.data = null;
          }

          return;
        }

        file.pos = (file.start ? file.start : 0) + header.offset;
        file.pos += 4;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 2;
        file.pos += 8;
        file.pos += 2;
        var numOfMetrics = file.getUint16();

        if (numOfMetrics > numGlyphs) {
          (0, _util.info)("The numOfMetrics (" + numOfMetrics + ") should not be " + "greater than the numGlyphs (" + numGlyphs + ")");
          numOfMetrics = numGlyphs;
          header.data[34] = (numOfMetrics & 0xff00) >> 8;
          header.data[35] = numOfMetrics & 0x00ff;
        }

        var numOfSidebearings = numGlyphs - numOfMetrics;
        var numMissing = numOfSidebearings - (metrics.length - numOfMetrics * 4 >> 1);

        if (numMissing > 0) {
          var entries = new Uint8Array(metrics.length + numMissing * 2);
          entries.set(metrics.data);

          if (dupFirstEntry) {
            entries[metrics.length] = metrics.data[2];
            entries[metrics.length + 1] = metrics.data[3];
          }

          metrics.data = entries;
        }
      }