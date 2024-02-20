function parse_Array() {
                var result0, result1, result2, result3, result4;
                var pos0;

                pos0 = clone(pos);
                if (input.charCodeAt(pos.offset) === 91) {
                    result0 = "[";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"[\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_Elements();
                        result2 = result2 !== null ? result2 : "";
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                if (input.charCodeAt(pos.offset) === 93) {
                                    result4 = "]";
                                    advance(pos, 1);
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"]\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
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