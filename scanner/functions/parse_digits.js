function parse_digits() {
        var result0, result1;
        var pos0;

        pos0 = pos;
        result0 = [];
        if (/^[0-9]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (/^[0-9]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[0-9]");
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, d) {
            var str = '';
            for(var i = 0; i < d.length; i++) {
                str += d[i];
            }
            return str;
        })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }