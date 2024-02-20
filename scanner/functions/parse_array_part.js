function parse_array_part() {
        var result0, result1, result2;
        var pos0, pos1, pos2, pos3;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        pos2 = clone(pos);
        pos3 = clone(pos);
        if (input.charCodeAt(pos.offset) === 46) {
          result1 = ".";
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\".\"");
          }
        }
        if (result1 !== null) {
          result2 = parse_key();
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = clone(pos3);
          }
        } else {
          result1 = null;
          pos = clone(pos3);
        }
        if (result1 !== null) {
          result1 = (function(offset, line, column, k) {return k})(pos2.offset, pos2.line, pos2.column, result1[1]);
        }
        if (result1 === null) {
          pos = clone(pos2);
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            pos2 = clone(pos);
            pos3 = clone(pos);
            if (input.charCodeAt(pos.offset) === 46) {
              result1 = ".";
              advance(pos, 1);
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result1 !== null) {
              result2 = parse_key();
              if (result2 !== null) {
                result1 = [result1, result2];
              } else {
                result1 = null;
                pos = clone(pos3);
              }
            } else {
              result1 = null;
              pos = clone(pos3);
            }
            if (result1 !== null) {
              result1 = (function(offset, line, column, k) {return k})(pos2.offset, pos2.line, pos2.column, result1[1]);
            }
            if (result1 === null) {
              pos = clone(pos2);
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = parse_array();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, d, a) { if (a) { return d.concat(a); } else { return d; } })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("array_part");
        }
        return result0;
      }