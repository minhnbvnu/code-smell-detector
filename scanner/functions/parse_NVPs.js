function parse_NVPs() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_NVP();
                if (result0 !== null) {
                    result1 = [];
                    result2 = parse_CNVP();
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_CNVP();
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
                    result0 = (function(offset, line, column, n, narr) {
                        var ret = [n];
                        ret = ret.concat(narr);
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }