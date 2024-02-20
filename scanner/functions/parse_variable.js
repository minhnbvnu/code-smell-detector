function parse_variable() {
        var result0, result1;
        var pos0;

        pos0 = pos;
        result0 = [];
        result1 = parse_literal();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_literal();
        }
        if (result0 !== null) {
          result0 = (function(offset, l) {
            var o = [];
            o.push(l[0]);
            var current = 0;
            for(var i = 1; i < l.length; i++) {
                if(typeof l[i] === 'string' && typeof o[current] === 'string') {
                    o[current] = o[current] + l[i];
                }
                else {
                    o.push(l[i]);
                    current++;
                }
            }
            return (o.length === 1) ? o[0] : o;
        })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }