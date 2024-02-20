function parse_False() {
                var result0;

                if (input.substr(pos.offset, 5) === "false") {
                    result0 = "false";
                    advance(pos, 5);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"false\"");
                    }
                }
                return result0;
            }