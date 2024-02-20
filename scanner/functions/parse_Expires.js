function parse_Expires() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    if (input.substr(pos.offset, 7) === "expires") {
                        result1 = "expires";
                        advance(pos, 7);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"expires\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = parse_Digits();
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
                    result0 = (function(offset, line, column, d) {
                        return {
                            expires: d
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[3]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }