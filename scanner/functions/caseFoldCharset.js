function caseFoldCharset(charSet) {
          var charsetParts = charSet.substring(1, charSet.length - 1).match(
            new RegExp(
              '\\\\u[0-9A-Fa-f]{4}'
              + '|\\\\x[0-9A-Fa-f]{2}'
              + '|\\\\[0-3][0-7]{0,2}'
              + '|\\\\[0-7]{1,2}'
              + '|\\\\[\\s\\S]'
              + '|-'
              + '|[^-\\\\]',
              'g'));
          var ranges = [];
          var inverse = charsetParts[0] === '^';

          var out = ['['];
          if (inverse) { out.push('^'); }

          for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
            var p = charsetParts[i];
            if (/\\[bdsw]/i.test(p)) {  // Don't muck with named groups.
              out.push(p);
            } else {
              var start = decodeEscape(p);
              var end;
              if (i + 2 < n && '-' === charsetParts[i + 1]) {
                end = decodeEscape(charsetParts[i + 2]);
                i += 2;
              } else {
                end = start;
              }
              ranges.push([start, end]);
              // If the range might intersect letters, then expand it.
              // This case handling is too simplistic.
              // It does not deal with non-latin case folding.
              // It works for latin source code identifiers though.
              if (!(end < 65 || start > 122)) {
                if (!(end < 65 || start > 90)) {
                  ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
                }
                if (!(end < 97 || start > 122)) {
                  ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
                }
              }
            }
          }

          // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
          // -> [[1, 12], [14, 14], [16, 17]]
          ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
          var consolidatedRanges = [];
          var lastRange = [];
          for (var i = 0; i < ranges.length; ++i) {
            var range = ranges[i];
            if (range[0] <= lastRange[1] + 1) {
              lastRange[1] = Math.max(lastRange[1], range[1]);
            } else {
              consolidatedRanges.push(lastRange = range);
            }
          }

          for (var i = 0; i < consolidatedRanges.length; ++i) {
            var range = consolidatedRanges[i];
            out.push(encodeEscape(range[0]));
            if (range[1] > range[0]) {
              if (range[1] + 1 > range[0]) { out.push('-'); }
              out.push(encodeEscape(range[1]));
            }
          }
          out.push(']');
          return out.join('');
        }