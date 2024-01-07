function skipUntil(data, offset, what) {
        var length = what.length,
            dataLength = data.length;
        var skipped = 0;

        while (offset < dataLength) {
          var i = 0;

          while (i < length && data[offset + i] === what[i]) {
            ++i;
          }

          if (i >= length) {
            break;
          }

          offset++;
          skipped++;
        }

        return skipped;
      }