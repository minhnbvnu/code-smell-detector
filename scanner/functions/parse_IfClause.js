function parse_IfClause() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 2) === "if") {
                    result0 = "if";
                    advance(pos, 2);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"if\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_LogicParen();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.charCodeAt(pos.offset) === 123) {
                                    result4 = "{";
                                    advance(pos, 1);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"{\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = [];
                                        result7 = parse_TryCrlf();
                                        while (result7 !== null) {
                                            result6.push(result7);
                                            result7 = parse_TryCrlf();
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                if (input.charCodeAt(pos.offset) === 125) {
                                                    result8 = "}";
                                                    advance(pos, 1);
                                                } else {
                                                    result8 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"}\"");
                                                    }
                                                }
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_ElseClause();
                                                        result10 = result10 !== null ? result10 : "";
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
                    result0 = (function(offset, line, column, condition, iflines, elselines) {
                        return {
                            id : id++,
                            line : line,
                            type : 'if',
                            condition : condition,
                            if : iflines,
                            else : elselines
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[6], result0[10]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }