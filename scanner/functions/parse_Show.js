function parse_Show() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.substr(pos.offset, 4) === "show") {
                    result0 = "show";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"show\"");
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