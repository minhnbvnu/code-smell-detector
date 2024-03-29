function parse_LogicParen() {
                var result0, result1, result2, result3, result4, result5;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.charCodeAt(pos.offset) === 40) {
                    result0 = "(";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"(\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_LogicPhrase();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.charCodeAt(pos.offset) === 41) {
                                    result4 = ")";
                                    advance(pos, 1);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\")\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result0 = [result0, result1, result2, result3, result4, result5];
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
                    result0 = (function(offset, line, column, p) {
                        return p;
                    })(pos0.offset, pos0.line, pos0.column, result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }