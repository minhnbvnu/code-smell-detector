function parse_ShowStatement() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Show();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 6) === "tables") {
                            result2 = "tables";
                            advance(pos, 6);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"tables\"");
                            }
                        }
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
                    result0 = (function(offset, line, column, s) {
                        return {
                            type: 'show',
                            line: s.line
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }