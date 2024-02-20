function parse_MinDelay() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 8).toLowerCase() === "mindelay") {
                    result0 = input.substr(pos.offset, 8);
                    advance(pos, 8);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"minDelay\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_Digits();
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
                    result0 = (function(offset, line, column, n) {
                        return n;
                    })(pos0.offset, pos0.line, pos0.column, result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }