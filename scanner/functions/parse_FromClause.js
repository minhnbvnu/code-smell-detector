function parse_FromClause() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result1 = parse_Source();
                if (result1 !== null) {
                    result0 = [];
                    while (result1 !== null) {
                        result0.push(result1);
                        result1 = parse_Source();
                    }
                } else {
                    result0 = null;
                }
                if (result0 !== null) {
                    result1 = [];
                    result2 = parse_CommaSource();
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_CommaSource();
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s, sarr) {
                        return s.concat(sarr);
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }