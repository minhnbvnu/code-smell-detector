function parse_Value() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_JSON();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, v) {
                        return {
                            object: v === "__null__" ? null : v,
                            type: 'define',
                            line: line
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }