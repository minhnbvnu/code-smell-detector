function parse_BlockComment() {
                var result0, result1, result2, result3, result4, result5;
                var pos0, pos1, pos2, pos3;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 3) === "/**") {
                    result0 = "/**";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"/**\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos.offset, 2) === "/*") {
                        result0 = "/*";
                        advance(pos, 2);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"/*\"");
                        }
                    }
                }
                if (result0 !== null) {
                    result1 = parse_sp();
                    if (result1 !== null) {
                        result2 = [];
                        pos2 = clone(pos);
                        pos3 = clone(pos);
                        reportFailures++;
                        if (input.substr(pos.offset, 2) === "*/") {
                            result3 = "*/";
                            advance(pos, 2);
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"*/\"");
                            }
                        }
                        reportFailures--;
                        if (result3 === null) {
                            result3 = "";
                        } else {
                            result3 = null;
                            pos = clone(pos3);
                        }
                        if (result3 !== null) {
                            result4 = parse_SourceCharacter();
                            if (result4 !== null) {
                                result3 = [result3, result4];
                            } else {
                                result3 = null;
                                pos = clone(pos2);
                            }
                        } else {
                            result3 = null;
                            pos = clone(pos2);
                        }
                        while (result3 !== null) {
                            result2.push(result3);
                            pos2 = clone(pos);
                            pos3 = clone(pos);
                            reportFailures++;
                            if (input.substr(pos.offset, 2) === "*/") {
                                result3 = "*/";
                                advance(pos, 2);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"*/\"");
                                }
                            }
                            reportFailures--;
                            if (result3 === null) {
                                result3 = "";
                            } else {
                                result3 = null;
                                pos = clone(pos3);
                            }
                            if (result3 !== null) {
                                result4 = parse_SourceCharacter();
                                if (result4 !== null) {
                                    result3 = [result3, result4];
                                } else {
                                    result3 = null;
                                    pos = clone(pos2);
                                }
                            } else {
                                result3 = null;
                                pos = clone(pos2);
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_sp();
                            if (result3 !== null) {
                                if (input.substr(pos.offset, 2) === "*/") {
                                    result4 = "*/";
                                    advance(pos, 2);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"*/\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result0 = [result0, result1, result2, result3, result4, result5];
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
                    result0 = (function(offset, line, column, c) {
                        return {
                            line: line,
                            type: 'comment',
                            text: append(c)
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }