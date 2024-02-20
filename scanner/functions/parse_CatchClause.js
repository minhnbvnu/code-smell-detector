function parse_CatchClause() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    if (input.substr(pos.offset, 5) === "catch") {
                        result1 = "catch";
                        advance(pos, 5);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"catch\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = parse_LogicParen();
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    if (input.charCodeAt(pos.offset) === 123) {
                                        result5 = "{";
                                        advance(pos, 1);
                                    } else {
                                        result5 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"{\"");
                                        }
                                    }
                                    if (result5 !== null) {
                                        result6 = parse_insig();
                                        if (result6 !== null) {
                                            result7 = [];
                                            result8 = parse_TryCrlf();
                                            while (result8 !== null) {
                                                result7.push(result8);
                                                result8 = parse_TryCrlf();
                                            }
                                            if (result7 !== null) {
                                                result8 = parse_insig();
                                                if (result8 !== null) {
                                                    if (input.charCodeAt(pos.offset) === 125) {
                                                        result9 = "}";
                                                        advance(pos, 1);
                                                    } else {
                                                        result9 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"}\"");
                                                        }
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
                    result0 = (function(offset, line, column, condition, lines) {
                        return {
                            condition : condition,
                            lines : lines
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[3], result0[7]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }