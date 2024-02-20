function parse_Return() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Ret();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_RetFallback();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_Route();
                                result4 = result4 !== null ? result4 : "";
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        if (input.charCodeAt(pos.offset) === 59) {
                                            result6 = ";";
                                            advance(pos, 1);
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\";\"");
                                            }
                                        }
                                        result6 = result6 !== null ? result6 : "";
                                        if (result6 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6];
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
                    result0 = (function(offset, line, column, re, o, r) {
                        var ret = {
                            type: 'return',
                            line: re.line,
                            id: id++,
                            rhs: o
                        };
                        if(!o.hasOwnProperty(id)) {
                            o.id = id++;
                        }
                        if(r) {
                            ret.route = r;
                        }
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2], result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }