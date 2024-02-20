function sanitizeMetrics(font, header, metrics, numGlyphs) {
        if (!header) {
          if (metrics) {
            metrics.data = null;
          }
          return;
        }

        font.pos = (font.start ? font.start : 0) + header.offset;
        font.pos += header.length - 2;
        var numOfMetrics = font.getUint16();

        if (numOfMetrics > numGlyphs) {
          info('The numOfMetrics (' + numOfMetrics + ') should not be ' +
               'greater than the numGlyphs (' + numGlyphs + ')');
          // Reduce numOfMetrics if it is greater than numGlyphs
          numOfMetrics = numGlyphs;
          header.data[34] = (numOfMetrics & 0xff00) >> 8;
          header.data[35] = numOfMetrics & 0x00ff;
        }

        var numOfSidebearings = numGlyphs - numOfMetrics;
        var numMissing = numOfSidebearings -
          ((metrics.length - numOfMetrics * 4) >> 1);

        if (numMissing > 0) {
          // For each missing glyph, we set both the width and lsb to 0 (zero).
          // Since we need to add two properties for each glyph, this explains
          // the use of |numMissing * 2| when initializing the typed array.
          var entries = new Uint8Array(metrics.length + numMissing * 2);
          entries.set(metrics.data);
          metrics.data = entries;
        }
      }