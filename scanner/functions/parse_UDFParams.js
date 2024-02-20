function parse_UDFParams() {
                var result0, result1, result2, result3, result4, result5;
                var pos0, pos1, pos2;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_UDFParam();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = [];
                        pos2 = clone(pos);
                        result3 = parse_Comma();
                        if (result3 !== null) {
                            result4 = parse_insig();
                            if (result4 !== null) {
                                result5 = parse_UDFParam();
                                if (result5 !== null) {
                                    result3 = [result3, result4, result5];
                                } else {
                                    result3 = null;
                                    pos = clone(pos2);
                                }
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
                            result3 = parse_Comma();
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result5 = parse_UDFParam();
                                    if (result5 !== null) {
                                        result3 = [result3, result4, result5];
                                    } else {
                                        result3 = null;
                                        pos = clone(pos2);
                                    }
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
                    result0 = (function(offset, line, column, c, carr) {
                        var res = [c];
                        collect(carr,',', res);
                        return res;
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[2]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }