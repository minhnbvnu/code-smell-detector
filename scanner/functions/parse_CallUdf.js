function parse_CallUdf() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_UDF();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, u) {
                        u.type = 'define';
                        u.udf = u.name;
                        delete u.operator;
                        return u;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }