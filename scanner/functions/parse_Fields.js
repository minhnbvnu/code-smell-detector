function parse_Fields() {
                var result0, result1, result2, result3, result4, result5;
                var pos0, pos1, pos2;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Field();
                if (result0 !== null) {
                    result1 = [];
                    pos2 = clone(pos);
                    result2 = parse_insig();
                    if (result2 !== null) {
                        result3 = parse_Comma();
                        if (result3 !== null) {
                            result4 = parse_insig();
                            if (result4 !== null) {
                                result5 = parse_Field();
                                if (result5 !== null) {
                                    result2 = [result2, result3, result4, result5];
                                } else {
                                    result2 = null;
                                    pos = clone(pos2);
                                }
                            } else {
                                result2 = null;
                                pos = clone(pos2);
                            }
                        } else {
                            result2 = null;
                            pos = clone(pos2);
                        }
                    } else {
                        result2 = null;
                        pos = clone(pos2);
                    }
                    while (result2 !== null) {
                        result1.push(result2);
                        pos2 = clone(pos);
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = parse_Comma();
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    result5 = parse_Field();
                                    if (result5 !== null) {
                                        result2 = [result2, result3, result4, result5];
                                    } else {
                                        result2 = null;
                                        pos = clone(pos2);
                                    }
                                } else {
                                    result2 = null;
                                    pos = clone(pos2);
                                }
                            } else {
                                result2 = null;
                                pos = clone(pos2);
                            }
                        } else {
                            result2 = null;
                            pos = clone(pos2);
                        }
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, arr) {
                        var res = [];
                        collect(arr, ",", res);
                        return res;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }