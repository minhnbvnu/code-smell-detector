function parse_ElseClause() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 4) === "else") {
                    result0 = "else";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"else\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.charCodeAt(pos.offset) === 123) {
                            result2 = "{";
                            advance(pos, 1);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"{\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = [];
                                result5 = parse_TryCrlf();
                                while (result5 !== null) {
                                    result4.push(result5);
                                    result5 = parse_TryCrlf();
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        if (input.charCodeAt(pos.offset) === 125) {
                                            result6 = "}";
                                            advance(pos, 1);
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"}\"");
                                            }
                                        }
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
                    result0 = (function(offset, line, column, larr) {
                        return larr;
                    })(pos0.offset, pos0.line, pos0.column, result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }