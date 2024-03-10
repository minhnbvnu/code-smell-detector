function parse_Route() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 3) === "via") {
                    result0 = "via";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"via\"");
                    }
                }
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
                                        result6 = parse_OptParam();
                                        result6 = result6 !== null ? result6 : "";
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = parse_UsingDefaults();
                                                result8 = result8 !== null ? result8 : "";
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        if (input.substr(pos.offset, 5) === "using") {
                                                            result10 = "using";
                                                            advance(pos, 5);
                                                        } else {
                                                            result10 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"using\"");
                                                            }
                                                        }
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                if (input.substr(pos.offset, 6) === "method") {
                                                                    result12 = "method";
                                                                    advance(pos, 6);
                                                                } else {
                                                                    result12 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"method\"");
                                                                    }
                                                                }
                                                                if (result12 !== null) {
                                                                    result13 = parse_insig();
                                                                    if (result13 !== null) {
                                                                        if (input.substr(pos.offset, 3) === "get") {
                                                                            result14 = "get";
                                                                            advance(pos, 3);
                                                                        } else {
                                                                            result14 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\"get\"");
                                                                            }
                                                                        }
                                                                        if (result14 === null) {
                                                                            if (input.substr(pos.offset, 4) === "post") {
                                                                                result14 = "post";
                                                                                advance(pos, 4);
                                                                            } else {
                                                                                result14 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\"post\"");
                                                                                }
                                                                            }
                                                                            if (result14 === null) {
                                                                                if (input.substr(pos.offset, 3) === "put") {
                                                                                    result14 = "put";
                                                                                    advance(pos, 3);
                                                                                } else {
                                                                                    result14 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\"put\"");
                                                                                    }
                                                                                }
                                                                                if (result14 === null) {
                                                                                    if (input.substr(pos.offset, 6) === "delete") {
                                                                                        result14 = "delete";
                                                                                        advance(pos, 6);
                                                                                    } else {
                                                                                        result14 = null;
                                                                                        if (reportFailures === 0) {
                                                                                            matchFailed("\"delete\"");
                                                                                        }
                                                                                    }
                                                                                    if (result14 === null) {
                                                                                        if (input.substr(pos.offset, 5) === "patch") {
                                                                                            result14 = "patch";
                                                                                            advance(pos, 5);
                                                                                        } else {
                                                                                            result14 = null;
                                                                                            if (reportFailures === 0) {
                                                                                                matchFailed("\"patch\"");
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        if (result14 !== null) {
                                                                            result15 = parse_insig();
                                                                            if (result15 !== null) {
                                                                                result16 = parse_UsingHeaders();
                                                                                result16 = result16 !== null ? result16 : "";
                                                                                if (result16 !== null) {
                                                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16];
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
                    result0 = (function(offset, line, column, p, op, d, m, h) {
                        return {
                            path: p,
                            method: m,
                            headers: h || {},
                            optparam: op || false,
                            defaults: d || {}
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[4], result0[6], result0[8], result0[14], result0[16]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }