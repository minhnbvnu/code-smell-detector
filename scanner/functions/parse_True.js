function parse_True() {
                var result0;

                if (input.substr(pos.offset, 4) === "true") {
                    result0 = "true";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"true\"");
                    }
                }
                return result0;
            }