function parse_ParamDigits() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Digits();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, d) {
                        return {
                            type: 'literal',
                            value: d
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }