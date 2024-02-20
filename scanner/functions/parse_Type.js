function parse_Type() {
                var result0;

                if (input.substr(pos.offset, 6) === "select") {
                    result0 = "select";
                    advance(pos, 6);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"select\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos.offset, 6) === "insert") {
                        result0 = "insert";
                        advance(pos, 6);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"insert\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos.offset, 6) === "delete") {
                            result0 = "delete";
                            advance(pos, 6);
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"delete\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.substr(pos.offset, 6) === "update") {
                                result0 = "update";
                                advance(pos, 6);
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"update\"");
                                }
                            }
                        }
                    }
                }
                return result0;
            }