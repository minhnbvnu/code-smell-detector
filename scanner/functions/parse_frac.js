function parse_frac() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 46) {
          result0 = ".";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\".\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_digits();
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
          result0 = (function(offset, digits) { return "." + digits; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }