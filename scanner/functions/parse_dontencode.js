function parse_dontencode() {
        var result0;
        var pos0;

        pos0 = pos;
        if (input.charCodeAt(pos) === 96) {
          result0 = "`";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"`\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
            return {
                dontencode: true
            }
        })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }