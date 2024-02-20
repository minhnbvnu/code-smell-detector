function parse_All() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.charCodeAt(pos.offset) === 42) {
                    result0 = "*";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"*\"");
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return {
                            name: '*',
                            type: 'column'
                        }
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }