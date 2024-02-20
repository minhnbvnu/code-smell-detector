function parse_GetFrom() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 3) === "get") {
                    result0 = "get";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"get\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 4) === "from") {
                            result2 = "from";
                            advance(pos, 4);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"from\"");
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
                    result0 = (function(offset, line, column) {
                        return 'get'
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }