function parse_Expr() {
                var result0, result1, result2, result3;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.charCodeAt(pos.offset) === 63) {
                    result0 = "?";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"?\"");
                    }
                }
                result0 = result0 !== null ? result0 : "";
                if (result0 !== null) {
                    if (input.charCodeAt(pos.offset) === 40) {
                        result1 = "(";
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"(\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_ExprBlock();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 41) {
                                result3 = ")";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\")\"");
                                }
                            }
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
                    result0 = (function(offset, line, column, q, e) {
                        return q + '(' + e + ')'
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }