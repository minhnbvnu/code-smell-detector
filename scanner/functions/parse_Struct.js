function parse_Struct() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    if (input.charCodeAt(pos.offset) === 123) {
                        result1 = "{";
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"{\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = parse_Members();
                            result3 = result3 !== null ? result3 : "";
                            if (result3 !== null) {
                                result4 = parse_insig();
                                if (result4 !== null) {
                                    if (input.charCodeAt(pos.offset) === 125) {
                                        result5 = "}";
                                        advance(pos, 1);
                                    } else {
                                        result5 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"}\"");
                                        }
                                    }
                                    if (result5 !== null) {
                                        result6 = parse_insig();
                                        if (result6 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6];
                                        } else {
                                            result0 = null;
                                            pos = clone(pos0);
                                        }
                                    } else {
                                        result0 = null;
                                        pos = clone(pos0);
                                    }
                                } else {
                                    result0 = null;
                                    pos = clone(pos0);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos0);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos0);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos0);
                }
                return result0;
            }