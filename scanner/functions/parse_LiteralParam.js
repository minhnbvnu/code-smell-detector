function parse_LiteralParam() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_JSON();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, j) {
                        return {
                            type: 'literal',
                            value: j
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }