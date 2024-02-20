function parse_Operator() {
                var result0, result1, result2;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    if (input.charCodeAt(pos.offset) === 61) {
                        result1 = "=";
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"=\"");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
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
                if (result0 === null) {
                    pos0 = clone(pos);
                    result0 = parse_insig();
                    if (result0 !== null) {
                        if (input.substr(pos.offset, 2) === "in") {
                            result1 = "in";
                            advance(pos, 2);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"in\"");
                            }
                        }
                        if (result1 !== null) {
                            result2 = parse_insig();
                            if (result2 !== null) {
                                result0 = [result0, result1, result2];
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
                }
                return result0;
            }