function parse_InsertStatement() {
                var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 6) === "insert") {
                    result0 = "insert";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"insert\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_QuotedWord();
                        result2 = result2 !== null ? result2 : "";
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.substr(pos.offset, 4) === "into") {
                                    result4 = "into";
                                    advance(pos, 4);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"into\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_Source();
                                        if (result6 !== null) {
                                            result7 = parse_insig();
                                            if (result7 !== null) {
                                                result8 = parse_ColumnsParen();
                                                result8 = result8 !== null ? result8 : "";
                                                if (result8 !== null) {
                                                    result9 = parse_insig();
                                                    if (result9 !== null) {
                                                        result10 = parse_ValuesParen();
                                                        result10 = result10 !== null ? result10 : "";
                                                        if (result10 !== null) {
                                                            result11 = parse_insig();
                                                            if (result11 !== null) {
                                                                result12 = parse_WithParts();
                                                                result12 = result12 !== null ? result12 : "";
                                                                if (result12 !== null) {
                                                                    result13 = parse_Timeout();
                                                                    result13 = result13 !== null ? result13 : "";
                                                                    if (result13 !== null) {
                                                                        result14 = parse_insig();
                                                                        if (result14 !== null) {
                                                                            result15 = parse_MinDelay();
                                                                            result15 = result15 !== null ? result15 : "";
                                                                            if (result15 !== null) {
                                                                                result16 = parse_insig();
                                                                                if (result16 !== null) {
                                                                                    result17 = parse_MaxDelay();
                                                                                    result17 = result17 !== null ? result17 : "";
                                                                                    if (result17 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17];
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
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, j, s, c, v, wp, timeout, minDelay, maxDelay) {
                        if (j && (c || v)){
                            throw new this.SyntaxError("Line " + line + ": Inserting JSON object cannot co-exist with name value pairs or opaque body.");
                        }
                        if (!v && c){
                            throw new this.SyntaxError("Line " + line + ": Values are required if columns are specified.");
                        }
                        if(c && c.length != v.value.length) {
                            throw new this.SyntaxError("Line " + line + ": Number of values does not match number of columns.");
                        }
                        if (!c && v && v.value.length > 1){
                            throw new this.SyntaxError("Line " + line + ": Values do not have paired columns.");
                        }
                        ret = {
                            type: 'insert',
                            source: s,
                            values: v.value,
                            line: line
                        }
                        if(timeout) {
                            ret.timeout = timeout;
                        }
                        if(minDelay) {
                            ret.minDelay = minDelay;
                        }
                        if(maxDelay) {
                            ret.maxDelay = maxDelay;
                        }

                        if (v){
                            if (c){
                                ret.columns = c,
                                    ret.values = v.value;
                            }else{
                                ret.values = v.value[0];
                            }
                        }
                        if (wp){
                            ret.parts = wp.value;
                        }
                        if (j){
                            ret.jsonObj = j;
                        }
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[6], result0[8], result0[10], result0[12], result0[13], result0[15], result0[17]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }