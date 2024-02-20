function parse_Descendent() {
                var result0, result1;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Selector();
                if (result0 !== null) {
                    result1 = parse_Identifier();
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s, i) {
                        return s + i;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }