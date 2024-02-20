function parse_WithAliases() {
                var result0, result1, result2, result3;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 4) === "with") {
                    result0 = "with";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"with\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 7) === "aliases") {
                            result2 = "aliases";
                            advance(pos, 7);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"aliases\"");
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
                    result0 = (function(offset, line, column, p) {
                        return merge(p);
                    })(pos0.offset, pos0.line, pos0.column, result0[3]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }