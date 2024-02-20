function parse_AliasSource() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Name();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 2) === "as") {
                            result2 = "as";
                            advance(pos, 2);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"as\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_Name();
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
                    result0 = (function(offset, line, column, s, a) {
                        if(symbols[s]) {
                            s = "{" + s + "}";
                        }
                        return {name: s, alias: a};
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }