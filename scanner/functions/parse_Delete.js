function parse_Delete() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.substr(pos.offset, 6) === "delete") {
                    result0 = "delete";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"delete\"");
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return 'delete'
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }