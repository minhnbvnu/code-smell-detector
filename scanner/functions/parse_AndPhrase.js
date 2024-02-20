function parse_AndPhrase() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_NotPhrase();
                if (result0 === null) {
                    result0 = parse_NormalPhrase();
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_AndTail();
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s1, sn) {
                        return {
                            type: 'logic',
                            logic: 'and',
                            id : id++,
                            line : line,
                            values: [s1].concat(sn)
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }