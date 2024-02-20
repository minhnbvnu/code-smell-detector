function parse_inline_part() {
        var result0;
        var pos0;
        
        result0 = parse_special();
        if (result0 === null) {
          result0 = parse_reference();
          if (result0 === null) {
            pos0 = clone(pos);
            result0 = parse_literal();
            if (result0 !== null) {
              result0 = (function(offset, line, column, l) { return ["buffer", l] })(pos0.offset, pos0.line, pos0.column, result0);
            }
            if (result0 === null) {
              pos = clone(pos0);
            }
          }
        }
        return result0;
      }