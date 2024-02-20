function parse_Selector() {
                var result0;

                if (input.substr(pos.offset, 2) === "..") {
                    result0 = "..";
                    advance(pos, 2);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"..\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos.offset) === 46) {
                        result0 = ".";
                        advance(pos, 1);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                }
                return result0;
            }