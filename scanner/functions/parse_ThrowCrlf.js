function parse_ThrowCrlf() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_sp();
                if (result0 !== null) {
                    if (input.substr(pos.offset, 5) === "throw") {
                        result1 = "throw";
                        advance(pos, 5);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"throw\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 40) {
                                result3 = "(";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"(\"");
                                }
                            }
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result5 = parse_Word();
                                    if (result5 !== null) {
                                        result6 = parse_insig();
                                        if (result6 !== null) {
                                            if (input.charCodeAt(pos.offset) === 41) {
                                                result7 = ")";
                                                advance(pos, 1);
                                            } else {
                                                result7 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\")\"");
                                                }
                                            }
                                            if (result7 !== null) {
                                                result8 = parse_insig();
                                                if (result8 !== null) {
                                                    result9 = [];
                                                    result10 = parse_crlf();
                                                    while (result10 !== null) {
                                                        result9.push(result10);
                                                        result10 = parse_crlf();
                                                    }
                                                    if (result9 !== null) {
                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
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
                    result0 = (function(offset, line, column, condition) {
                        return {
                            id : id++,
                            line : line,
                            type : 'throw',
                            err : condition
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[5]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }