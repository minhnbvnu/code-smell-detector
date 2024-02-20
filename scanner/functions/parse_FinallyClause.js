function parse_FinallyClause() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    if (input.substr(pos.offset, 7) === "finally") {
                        result1 = "finally";
                        advance(pos, 7);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"finally\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 123) {
                                result3 = "{";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"{\"");
                                }
                            }
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result6 = parse_ClauseCrlf();
                                    if (result6 !== null) {
                                        result5 = [];
                                        while (result6 !== null) {
                                            result5.push(result6);
                                            result6 = parse_ClauseCrlf();
                                        }
                                    } else {
                                        result5 = null;
                                    }
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
                    result0 = (function(offset, line, column, lines) {
                        return lines;
                    })(pos0.offset, pos0.line, pos0.column, result0[5]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }