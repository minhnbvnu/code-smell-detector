function parse_topmembers() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_pair();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse____();
          if (result2 !== null) {
            result3 = parse_pair();
            result3 = result3 !== null ? result3 : "";
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
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse____();
            if (result2 !== null) {
              result3 = parse_pair();
              result3 = result3 !== null ? result3 : "";
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
          result0 = (function(offset, head, tail) {
              var result = {};
              result[head[0]] = head[1];
              for (var i = 0; i < tail.length; i++) {
                result[tail[i][1][0]] = tail[i][1][1];
              }
              if (typeof result['undefined'] === 'undefined') {
                delete result['undefined'];
              }
              return result;
            })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }