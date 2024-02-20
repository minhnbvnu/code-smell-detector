function parse_ExprBlock() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_StringLiteral();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s) {
                        return s.substr(1, s.length - 2);
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }