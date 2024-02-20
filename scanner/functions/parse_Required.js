function parse_Required() {
                var result0;

                if (input.charCodeAt(pos.offset) === 94) {
                    result0 = "^";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"^\"");
                    }
                }
                return result0;
            }