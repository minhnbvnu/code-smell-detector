function parse_Assign() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Output();
                result0 = result0 !== null ? result0 : "";
                if (result0 !== null) {
                    result1 = parse_Fallback();
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            if (input.charCodeAt(pos.offset) === 59) {
                                result3 = ";";
                                advance(pos, 1);
                            } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\";\"");
                                }
                            }
                            result3 = result3 !== null ? result3 : "";
                            if (result3 !== null) {
                                result4 = parse_insig();
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
                    result0 = (function(offset, line, column, a, s) {
                        if(a) {
                            s.assign = a.assign;
                            s.line = a.line;
                            var next = s.fallback;
                            while(next) {
                                next.id = id++;
                                next.assign = s.assign;
                                next = next.fallback;
                            }
                        }

                        // Add LHS to the symbol table
                        symbols[a.assign] = {};
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }