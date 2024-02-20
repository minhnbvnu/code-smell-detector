function parse_multivalued() {
        var result0, result1;
        var pos0, pos1;

        pos0 = pos;
        pos1 = pos;
        result0 = parse_digits();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 124) {
            result1 = "|";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"|\"");
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
          result0 = (function(offset, d) {
            var ret = {
                multivalued: true
            }
            d = parseInt(d);
            if(d > 0) {
                ret.max = d;
            }
            return ret;
        })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }