function parse_WordVal() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_QuotedWord();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, q) {
                        return q.value;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }