function parse_InCond() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Name();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 2) === "in") {
                            result2 = "in";
                            advance(pos, 2);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"in\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.charCodeAt(pos.offset) === 40) {
                                    result4 = "(";
                                    advance(pos, 1);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"(\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_SelectStatement();
                                        if (result6 === null) {
                                            result6 = parse_CSV();
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                if (input.charCodeAt(pos.offset) === 41) {
                                                    result8 = ")";
                                                    advance(pos, 1);
                                                } else {
                                                    result8 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\")\"");
                                                    }
                                                }
                                                if (result8 !== null) {
                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
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
                    result0 = (function(offset, line, column, lhs, rhs) {
                        return {operator : 'in', lhs : {name: lhs}, rhs: rhs};
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[6]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }