function parse_And() {
                var result0;

                if (input.substr(pos.offset, 3) === "and") {
                    result0 = "and";
                    advance(pos, 3);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"and\"");
                    }
                }
                return result0;
            }