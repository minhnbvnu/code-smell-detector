function parse_FalseVal() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_False();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, f) {
                        return JSON.parse(f);
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }