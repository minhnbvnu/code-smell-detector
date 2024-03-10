function parse_topobject() {
        var result0, result1, result2, result3, result4;
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
          result1 = parse___();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 125) {
              result2 = "}";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"}\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
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
          result0 = (function(offset) { return {};      })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
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
            result1 = parse___();
            if (result1 !== null) {
              result2 = parse_topmembers();
              if (result2 !== null) {
                result3 = parse___();
                if (result3 !== null) {
                  if (input.charCodeAt(pos) === 125) {
                    result4 = "}";
                    pos++;
                  } else {
                    result4 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"}\"");
                    }
                  }
                  if (result4 !== null) {
                    result0 = [result0, result1, result2, result3, result4];
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
            result0 = (function(offset, topmembers) { return topmembers; })(pos0, result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }