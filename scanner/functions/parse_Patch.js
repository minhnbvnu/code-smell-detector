function parse_Patch() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (input.substr(pos.offset, 5) === "patch") {
                    result0 = "patch";
                    advance(pos, 5);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"patch\"");
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return 'patch'
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }