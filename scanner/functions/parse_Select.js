function parse_Select() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.substr(pos.offset, 6) === "select") {
                    result0 = "select";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"select\"");
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s) {
                        return {
                            type: 'select',
                            line: line
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }