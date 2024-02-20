function parse_Ref() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Name();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, i) {
                        return {
                            value: "{" + i + "}"
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }