function parse_Indexed() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.charCodeAt(pos.offset) === 91) {
                    result0 = "[";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"[\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_PositiveNumber();
                    if (result1 === null) {
                        result1 = parse_WordVal();
                        if (result1 === null) {
                            result1 = parse_StringLiteral();
                            if (result1 === null) {
                                result1 = parse_Expr();
                            }
                        }
                    }
                    if (result1 !== null) {
                        if (input.charCodeAt(pos.offset) === 93) {
                            result2 = "]";
                            advance(pos, 1);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"]\"");
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
                    result0 = (function(offset, line, column, p) {
                        return '[' + p + ']';
                    })(pos0.offset, pos0.line, pos0.column, result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }