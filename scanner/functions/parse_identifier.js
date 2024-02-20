function parse_identifier() {
        var result0;
        var pos0;
        
        reportFailures++;
        pos0 = clone(pos);
        result0 = parse_path();
        if (result0 !== null) {
          result0 = (function(offset, line, column, p) { var arr = ["path"].concat(p); arr.text = p[1].join('.'); return arr; })(pos0.offset, pos0.line, pos0.column, result0);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          result0 = parse_key();
          if (result0 !== null) {
            result0 = (function(offset, line, column, k) { var arr = ["key", k]; arr.text = k; return arr; })(pos0.offset, pos0.line, pos0.column, result0);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("identifier");
        }
        return result0;
      }