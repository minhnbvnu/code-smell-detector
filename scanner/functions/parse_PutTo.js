function parse_PutTo() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 3) === "put") {
                    result0 = "put";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"put\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 2) === "to") {
                            result2 = "to";
                            advance(pos, 2);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"to\"");
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
                        return 'put'
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }