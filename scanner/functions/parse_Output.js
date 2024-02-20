function parse_Output() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    result1 = parse_Word();
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 61) {
                                result3 = "=";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"=\"");
                                }
                            }
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
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
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, w) {
                        return {
                            line: line,
                            assign: w
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }