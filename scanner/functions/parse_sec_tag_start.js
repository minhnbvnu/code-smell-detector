function parse_sec_tag_start() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_ld();
        if (result0 !== null) {
          if (/^[#?^<+@%]/.test(input.charAt(pos.offset))) {
            result1 = input.charAt(pos.offset);
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[#?^<+@%]");
            }
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse_ws();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_ws();
            }
            if (result2 !== null) {
              result3 = parse_identifier();
              if (result3 !== null) {
                result4 = parse_context();
                if (result4 !== null) {
                  result5 = parse_params();
                  if (result5 !== null) {
                    result0 = [result0, result1, result2, result3, result4, result5];
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
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, t, n, c, p) { return [t, n, c, p] })(pos0.offset, pos0.line, pos0.column, result0[1], result0[3], result0[4], result0[5]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }