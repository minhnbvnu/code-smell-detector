function parse_DeleteStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 6) === "delete") {
                    result0 = "delete";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"delete\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 4) === "from") {
                            result2 = "from";
                            advance(pos, 4);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"from\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_Source();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = [];
                                        result7 = parse_WhereClause();
                                        while (result7 !== null) {
                                            result6.push(result7);
                                            result7 = parse_WhereClause();
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = parse_Timeout();
                                                result8 = result8 !== null ? result8 : "";
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_MinDelay();
                                                        result10 = result10 !== null ? result10 : "";
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                result12 = parse_MaxDelay();
                                                                result12 = result12 !== null ? result12 : "";
                                                                if (result12 !== null) {
                                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12];
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
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s, wc, timeout, minDelay, maxDelay) {
                        var s = {
                            type: 'delete',
                            source: s,
                            whereCriteria: wc[0],
                            line: line
                        }

                        if(timeout) {
                            s.timeout = timeout;
                        }
                        if(minDelay) {
                            s.minDelay = minDelay;
                        }
                        if(maxDelay) {
                            s.maxDelay = maxDelay;
                        }
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[4], result0[6], result0[8], result0[10], result0[12]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }