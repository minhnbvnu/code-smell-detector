function parse_LinkParam() {
        var result0, result1;
        var pos0, pos1;

        pos0 = pos;
        pos1 = pos;
        result0 = parse_LinkParamName();
        if (result0 !== null) {
          result1 = parse_LinkParamValue();
          result1 = result1 !== null ? result1 : "";
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
          result0 = (function(offset, name, value) { return [name, value] })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }