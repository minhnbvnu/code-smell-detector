function parse_UpdateStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 6) === "update") {
                    result0 = "update";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"update\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_Source();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.substr(pos.offset, 4) === "with") {
                                    result4 = "with";
                                    advance(pos, 4);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"with\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_QuotedWord();
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
                    result0 = (function(offset, line, column, s, w, timeout, minDelay, maxDelay) {

                        var u = {
                            type: 'update',
                            source : s,
                            withClause: w,
                            line: line
                        };

                        if(timeout) {
                            u.timeout = timeout;
                        }
                        if(minDelay) {
                            u.minDelay = minDelay;
                        }
                        if(maxDelay) {
                            u.maxDelay = maxDelay;
                        }
                        return u;
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[6], result0[8], result0[10], result0[12]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }