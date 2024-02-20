function parse_QuotedStringInternal() {
        var result0, result1;
        var pos0;

        pos0 = pos;
        result0 = [];
        result1 = parse_QDText();
        if (result1 === null) {
          result1 = parse_QuotedPair();
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_QDText();
          if (result1 === null) {
            result1 = parse_QuotedPair();
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, str) { return str.join('') })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }