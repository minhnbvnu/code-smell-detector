function parse_bitwise_operator() {
        var result0;
        var pos0;
        
        reportFailures++;
        if (input.substr(pos, 2) === ">>") {
          result0 = ">>";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\">>\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 3) === ">>>") {
            result0 = ">>>";
            pos += 3;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\">>>\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 2) === "<<") {
              result0 = "<<";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"<<\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 3) === "<<<") {
                result0 = "<<<";
                pos += 3;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"<<<\"");
                }
              }
              if (result0 === null) {
                pos0 = pos;
                if (/^[&|^]/.test(input.charAt(pos))) {
                  result0 = input.charAt(pos);
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("[&|^]");
                  }
                }
                if (result0 !== null) {
                  result0 = (function(offset, op) { return op; })(pos0, result0);
                }
                if (result0 === null) {
                  pos = pos0;
                }
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("bitwise_operator");
        }
        return result0;
      }