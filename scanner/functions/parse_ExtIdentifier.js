function parse_ExtIdentifier() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = [];
                result1 = parse_Descendent();
                if (result1 === null) {
                    result1 = parse_Indexed();
                }
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_Descendent();
                    if (result1 === null) {
                        result1 = parse_Indexed();
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, c) {
                        return c.join('');
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }