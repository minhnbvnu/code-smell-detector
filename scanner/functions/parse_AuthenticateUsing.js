function parse_AuthenticateUsing() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 12) === "authenticate") {
                    result0 = "authenticate";
                    advance(pos, 12);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"authenticate\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos.offset, 4) === "auth") {
                        result0 = "auth";
                        advance(pos, 4);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"auth\"");
                        }
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 5) === "using") {
                            result2 = "using";
                            advance(pos, 5);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"using\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_QuotedWord();
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
                    result0 = (function(offset, line, column, m) {
                        return m.value;
                    })(pos0.offset, pos0.line, pos0.column, result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }