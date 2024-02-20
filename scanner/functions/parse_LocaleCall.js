function parse_LocaleCall() {
        var result0, result1, result2, result3, result4, result5, result6, result7;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_Locale();
        if (result0 !== null) {
          result1 = parse_OpenParen();
          if (result1 !== null) {
            result2 = parse___();
            if (result2 !== null) {
              result3 = parse_paramString();
              if (result3 !== null) {
                result4 = parse___();
                if (result4 !== null) {
                  pos2 = pos;
                  result5 = parse_paramComma();
                  if (result5 !== null) {
                    result6 = parse___();
                    if (result6 !== null) {
                      result7 = parse_paramString();
                      if (result7 !== null) {
                        result5 = [result5, result6, result7];
                      } else {
                        result5 = null;
                        pos = pos2;
                      }
                    } else {
                      result5 = null;
                      pos = pos2;
                    }
                  } else {
                    result5 = null;
                    pos = pos2;
                  }
                  result5 = result5 !== null ? result5 : "";
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
          result0 = (function(offset, param1, param2) {
            return ALLOY_EXPR + 'L(' + param1 + (param2 ? param2.join('') : '') + ')';
          })(pos0, result0[3], result0[5]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }