function parse_RetFallback() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1, pos2, pos3;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_RetVal();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        pos2 = clone(pos);
                        pos3 = clone(pos);
                        if (input.substr(pos.offset, 2) === "||") {
                            result2 = "||";
                            advance(pos, 2);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"||\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_RetFallback();
                                if (result4 !== null) {
                                    result2 = [result2, result3, result4];
                                } else {
                                    result2 = null;
                                    pos = clone(pos3);
                                }
                            } else {
                                result2 = null;
                                pos = clone(pos3);
                            }
                        } else {
                            result2 = null;
                            pos = clone(pos3);
                        }
                        if (result2 !== null) {
                            result2 = (function(offset, line, column, f) { return f; })(pos2.offset, pos2.line, pos2.column, result2[2]);
                        }
                        if (result2 === null) {
                            pos = clone(pos2);
                        }
                        result2 = result2 !== null ? result2 : "";
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
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
                    result0 = (function(offset, line, column, s1, s2) {
                        if(s2) {
                            s1.fallback = s2;
                            if(!s2.hasOwnProperty('id')) {
                                s2.id = id++;
                            }
                        }
                        return s1;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }