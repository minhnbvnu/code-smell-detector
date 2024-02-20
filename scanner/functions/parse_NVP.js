function parse_NVP() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    result1 = parse_Field();
                    if (result1 === null) {
                        result1 = parse_QuotedWord();
                    }
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
                                    result5 = parse_RHS();
                                    if (result5 !== null) {
                                        result6 = parse_insig();
                                        if (result6 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6];
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
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, lhs, rhs) {
                        var  o = {};
                        lhs = lhs.name || lhs;
                        o[lhs.hasOwnProperty('value') ? lhs.value : lhs] = rhs.hasOwnProperty('value') ? rhs.value : rhs;
                        return o;
                    })(pos0.offset, pos0.line, pos0.column, result0[1], result0[5]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }