function parse_NonAliasSource() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Name();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s) {
                        if(symbols[s]) {
                            s = "{" + s + "}";
                        }
                        return {name: s};
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }