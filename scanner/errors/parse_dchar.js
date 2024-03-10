function parse_dchar() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                if (/^[^"\\\0-\x1F]/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[^\"\\\\\\0-\\x1F]");
                    }
                }
                if (result0 === null) {
                    pos0 = clone(pos);
                    if (input.substr(pos.offset, 2) === "\\\"") {
                        result0 = "\\\"";
                        advance(pos, 2);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"\\\\\\\"\"");
                        }
                    }
                    if (result0 !== null) {
                        result0 = (function(offset, line, column) { return '"';  })(pos0.offset, pos0.line, pos0.column);
                    }
                    if (result0 === null) {
                        pos = clone(pos0);
                    }
                    if (result0 === null) {
                        pos0 = clone(pos);
                        if (input.substr(pos.offset, 2) === "\\\\") {
                            result0 = "\\\\";
                            advance(pos, 2);
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"\\\\\\\\\"");
                            }
                        }
                        if (result0 !== null) {
                            result0 = (function(offset, line, column) { return "\\"; })(pos0.offset, pos0.line, pos0.column);
                        }
                        if (result0 === null) {
                            pos = clone(pos0);
                        }
                        if (result0 === null) {
                            pos0 = clone(pos);
                            if (input.substr(pos.offset, 2) === "\\/") {
                                result0 = "\\/";
                                advance(pos, 2);
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"\\\\/\"");
                                }
                            }
                            if (result0 !== null) {
                                result0 = (function(offset, line, column) { return "/";  })(pos0.offset, pos0.line, pos0.column);
                            }
                            if (result0 === null) {
                                pos = clone(pos0);
                            }
                            if (result0 === null) {
                                pos0 = clone(pos);
                                if (input.substr(pos.offset, 2) === "\\b") {
                                    result0 = "\\b";
                                    advance(pos, 2);
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"\\\\b\"");
                                    }
                                }
                                if (result0 !== null) {
                                    result0 = (function(offset, line, column) { return "\b"; })(pos0.offset, pos0.line, pos0.column);
                                }
                                if (result0 === null) {
                                    pos = clone(pos0);
                                }
                                if (result0 === null) {
                                    pos0 = clone(pos);
                                    if (input.substr(pos.offset, 2) === "\\f") {
                                        result0 = "\\f";
                                        advance(pos, 2);
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"\\\\f\"");
                                        }
                                    }
                                    if (result0 !== null) {
                                        result0 = (function(offset, line, column) { return "\f"; })(pos0.offset, pos0.line, pos0.column);
                                    }
                                    if (result0 === null) {
                                        pos = clone(pos0);
                                    }
                                    if (result0 === null) {
                                        pos0 = clone(pos);
                                        if (input.substr(pos.offset, 2) === "\\n") {
                                            result0 = "\\n";
                                            advance(pos, 2);
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"\\\\n\"");
                                            }
                                        }
                                        if (result0 !== null) {
                                            result0 = (function(offset, line, column) { return "\n"; })(pos0.offset, pos0.line, pos0.column);
                                        }
                                        if (result0 === null) {
                                            pos = clone(pos0);
                                        }
                                        if (result0 === null) {
                                            pos0 = clone(pos);
                                            if (input.substr(pos.offset, 2) === "\\r") {
                                                result0 = "\\r";
                                                advance(pos, 2);
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"\\\\r\"");
                                                }
                                            }
                                            if (result0 !== null) {
                                                result0 = (function(offset, line, column) { return "\r"; })(pos0.offset, pos0.line, pos0.column);
                                            }
                                            if (result0 === null) {
                                                pos = clone(pos0);
                                            }
                                            if (result0 === null) {
                                                pos0 = clone(pos);
                                                if (input.substr(pos.offset, 2) === "\\t") {
                                                    result0 = "\\t";
                                                    advance(pos, 2);
                                                } else {
                                                    result0 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"\\\\t\"");
                                                    }
                                                }
                                                if (result0 !== null) {
                                                    result0 = (function(offset, line, column) { return "\t"; })(pos0.offset, pos0.line, pos0.column);
                                                }
                                                if (result0 === null) {
                                                    pos = clone(pos0);
                                                }
                                                if (result0 === null) {
                                                    pos0 = clone(pos);
                                                    pos1 = clone(pos);
                                                    if (input.substr(pos.offset, 2) === "\\u") {
                                                        result0 = "\\u";
                                                        advance(pos, 2);
                                                    } else {
                                                        result0 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"\\\\u\"");
                                                        }
                                                    }
                                                    if (result0 !== null) {
                                                        result1 = parse_hexDigit();
                                                        if (result1 !== null) {
                                                            result2 = parse_hexDigit();
                                                            if (result2 !== null) {
                                                                result3 = parse_hexDigit();
                                                                if (result3 !== null) {
                                                                    result4 = parse_hexDigit();
                                                                    if (result4 !== null) {
                                                                        result0 = [result0, result1, result2, result3, result4];
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
                                                        result0 = (function(offset, line, column, h1, h2, h3, h4) {
                                                            return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                                                        })(pos0.offset, pos0.line, pos0.column, result0[1], result0[2], result0[3], result0[4]);
                                                    }
                                                    if (result0 === null) {
                                                        pos = clone(pos0);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return result0;
            }