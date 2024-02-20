function parse_Field() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_AliasField();
                if (result0 === null) {
                    result0 = parse_NonAliasField();
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, f) {
                        return f;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }