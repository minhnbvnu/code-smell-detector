function parse_reference() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_ld();
        if (result0 !== null) {
          result1 = parse_identifier();
          if (result1 !== null) {
            result2 = parse_filters();
            if (result2 !== null) {
              result3 = parse_rd();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, n, f) { return ["reference", n, f].concat([['line', line], ['col', column]]) })(pos0.offset, pos0.line, pos0.column, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("reference");
        }
        return result0;
      }