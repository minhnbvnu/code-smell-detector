function parse_Pair() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    result1 = parse_StringLiteral();
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 58) {
                                result3 = ":";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                }
                            }
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result5 = parse_Value();
                                    if (result5 !== null) {
                                        result6 = parse_insig();
                                        if (result6 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6];
                                        } else {
                                            result0 = null;
                                            pos = clone(pos0);
                                        }
                                    } else {
                                        result0 = null;
                                        pos = clone(pos0);
                                    }
                                } else {
                                    result0 = null;
                                    pos = clone(pos0);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos0);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos0);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos0);
                }
                return result0;
            }