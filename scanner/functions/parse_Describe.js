function parse_Describe() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.substr(pos.offset, 8) === "describe") {
                    result0 = "describe";
                    advance(pos, 8);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"describe\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos.offset, 4) === "desc") {
                        result0 = "desc";
                        advance(pos, 4);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"desc\"");
                        }
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return {
                            line: line
                        }
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }