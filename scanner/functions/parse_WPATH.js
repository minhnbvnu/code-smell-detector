function parse_WPATH() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 5) === "WPATH") {
          result0 = "WPATH";
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"WPATH\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_OpenParen();
          if (result1 !== null) {
            result2 = parse___();
            if (result2 !== null) {
              result3 = parse_paramString();
              if (result3 !== null) {
                result4 = parse___();
                if (result4 !== null) {
                  result5 = [];
                  pos2 = pos;
                  result6 = parse_paramComma();
                  if (result6 !== null) {
                    result7 = parse___();
                    if (result7 !== null) {
                      result8 = parse_paramString();
                      if (result8 !== null) {
                        result6 = [result6, result7, result8];
                      } else {
                        result6 = null;
                        pos = pos2;
                      }
                    } else {
                      result6 = null;
                      pos = pos2;
                    }
                  } else {
                    result6 = null;
                    pos = pos2;
                  }
                  while (result6 !== null) {
                    result5.push(result6);
                    pos2 = pos;
                    result6 = parse_paramComma();
                    if (result6 !== null) {
                      result7 = parse___();
                      if (result7 !== null) {
                        result8 = parse_paramString();
                        if (result8 !== null) {
                          result6 = [result6, result7, result8];
                        } else {
                          result6 = null;
                          pos = pos2;
                        }
                      } else {
                        result6 = null;
                        pos = pos2;
                      }
                    } else {
                      result6 = null;
                      pos = pos2;
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse___();
                    if (result6 !== null) {
                      result7 = parse_CloseParen();
                      if (result7 !== null) {
                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
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
          result0 = (function(offset, param1) {
            return ALLOY_EXPR + 'WPATH(' + param1 + ')';
          })(pos0, result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }