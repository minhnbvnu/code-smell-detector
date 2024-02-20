function parse_DescribeRouteStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Describe();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 5) === "route") {
                            result2 = "route";
                            advance(pos, 5);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"route\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_QuotedWord();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        if (input.substr(pos.offset, 5) === "using") {
                                            result6 = "using";
                                            advance(pos, 5);
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"using\"");
                                            }
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                if (input.substr(pos.offset, 6) === "method") {
                                                    result8 = "method";
                                                    advance(pos, 6);
                                                } else {
                                                    result8 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"method\"");
                                                    }
                                                }
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        if (input.substr(pos.offset, 3) === "get") {
                                                            result10 = "get";
                                                            advance(pos, 3);
                                                        } else {
                                                            result10 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"get\"");
                                                            }
                                                        }
                                                        if (result10 === null) {
                                                            if (input.substr(pos.offset, 4) === "post") {
                                                                result10 = "post";
                                                                advance(pos, 4);
                                                            } else {
                                                                result10 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\"post\"");
                                                                }
                                                            }
                                                            if (result10 === null) {
                                                                if (input.substr(pos.offset, 3) === "put") {
                                                                    result10 = "put";
                                                                    advance(pos, 3);
                                                                } else {
                                                                    result10 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"put\"");
                                                                    }
                                                                }
                                                                if (result10 === null) {
                                                                    if (input.substr(pos.offset, 6) === "delete") {
                                                                        result10 = "delete";
                                                                        advance(pos, 6);
                                                                    } else {
                                                                        result10 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\"delete\"");
                                                                        }
                                                                    }
                                                                    if (result10 === null) {
                                                                        if (input.substr(pos.offset, 5) === "patch") {
                                                                            result10 = "patch";
                                                                            advance(pos, 5);
                                                                        } else {
                                                                            result10 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\"patch\"");
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (result10 !== null) {
                                                            result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];
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
                    result0 = (function(offset, line, column, d, p, m) {
                        return {
                            type: 'describe route',
                            line: d.line,
                            path: p,
                            method: m
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[4], result0[10]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }