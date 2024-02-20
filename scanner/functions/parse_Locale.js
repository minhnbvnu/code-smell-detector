function parse_Locale() {
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        result0 = parse_TiNS();
        if (result0 !== null) {
          if (input.substr(pos, 17) === ".Locale.getString") {
            result1 = ".Locale.getString";
            pos += 17;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\".Locale.getString\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 76) {
            result0 = "L";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"L\"");
            }
          }
        }
        return result0;
      }