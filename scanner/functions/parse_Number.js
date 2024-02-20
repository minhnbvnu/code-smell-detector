function parse_Number() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Int();
                if (result0 !== null) {
                    result1 = parse_Frac();
                    if (result1 !== null) {
                        result2 = parse_Exp();
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
                if (result0 === null) {
                    pos1 = clone(pos);
                    result0 = parse_Int();
                    if (result0 !== null) {
                        result1 = parse_Frac();
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
                    if (result0 === null) {
                        pos1 = clone(pos);
                        result0 = parse_Int();
                        if (result0 !== null) {
                            result1 = parse_Exp();
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
                        if (result0 === null) {
                            result0 = parse_Int();
                        }
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, c) {
                        return append(c);
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }