function parse_expression() {
        var result0, result1, result2, result3;
        var pos0, pos1;

        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 123) {
          result0 = "{";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse_operator();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_operator();
          }
          if (result1 !== null) {
            result2 = parse_variable();
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 125) {
                result3 = "}";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"}\"");
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, op, v) {
            var token = {
                variable: v
            };
            for(var i = 0; i < op.length; i++) {
                for(p in op[i]) {
                    if(op[i].hasOwnProperty(p)) {
                        token[p] = op[i][p];
                    }
                }
            }
            return token;
        })(pos0, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }