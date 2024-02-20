function parse_UsingBodyTemplate() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 5) === "using") {
                    result0 = "using";
                    advance(pos, 5);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"using\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 12) === "bodyTemplate") {
                            result2 = "bodyTemplate";
                            advance(pos, 12);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"bodyTemplate\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_QuotedWord();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        if (input.substr(pos.offset, 4) === "type") {
                                            result6 = "type";
                                            advance(pos, 4);
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"type\"");
                                            }
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = parse_QuotedWord();
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_ForEachMember();
                                                        result10 = result10 !== null ? result10 : "";
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11];
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
                    result0 = (function(offset, line, column, t, m, f) {
                        var ret = {
                            template: t.value,
                            type: m.value
                        }
                        if(f) {
                            ret.foreach = f;
                        }
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0[4], result0[8], result0[10]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }