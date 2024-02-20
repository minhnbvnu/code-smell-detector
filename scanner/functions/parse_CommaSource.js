function parse_CommaSource() {
                var result0, result1, result2, result3;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    result1 = parse_Comma();
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = parse_Source();
                            if (result3 !== null) {
                                result0 = [result0, result1, result2, result3];
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
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s) {
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[3]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }