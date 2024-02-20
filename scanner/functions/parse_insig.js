function parse_insig() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_sp();
                if (result0 !== null) {
                    result1 = [];
                    result2 = parse_crlf();
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_crlf();
                    }
                    if (result1 !== null) {
                        result2 = parse_sp();
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
                    result0 = (function(offset, line, column) { return ''})(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }