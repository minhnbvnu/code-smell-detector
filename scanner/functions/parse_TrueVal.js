function parse_TrueVal() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_True();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, t) {
                        return JSON.parse(t);
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }