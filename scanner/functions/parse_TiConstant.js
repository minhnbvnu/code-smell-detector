function parse_TiConstant() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_TiNS();
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 46) {
            result2 = ".";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_bareString();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              pos2 = pos;
              if (input.charCodeAt(pos) === 46) {
                result2 = ".";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\".\"");
                }
              }
              if (result2 !== null) {
                result3 = parse_bareString();
                if (result3 !== null) {
                  result2 = [result2, result3];
                } else {
                  result2 = null;
                  pos = pos2;
                }
              } else {
                result2 = null;
                pos = pos2;
              }
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, parts) {
            var tc = ALLOY_EXPR + parts[0];
            var len = parts[1] ? parts[1].length : 0;
            for (var i = 0; i < len; i++) {
              tc += parts[1][i].join('');
            }
            return tc;
          })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }