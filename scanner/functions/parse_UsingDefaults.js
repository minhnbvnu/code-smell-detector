function parse_UsingDefaults() {
                var result0, result1, result2, result3;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 5) === "using") {
                    result0 = "using";
                    advance(pos, 5);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"using\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 8) === "defaults") {
                            result2 = "defaults";
                            advance(pos, 8);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"defaults\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_NVPs();
                            if (result3 !== null) {
                                result0 = [result0, result1, result2, result3];
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
                    result0 = (function(offset, line, column, d) {
                        return merge(d);
                    })(pos0.offset, pos0.line, pos0.column, result0[3]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }