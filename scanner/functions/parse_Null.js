function parse_Null() {
                var result0;

                if (input.substr(pos.offset, 4) === "null") {
                    result0 = "null";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"null\"");
                    }
                }
                return result0;
            }