function parse_e() {
                var result0;

                if (input.charCodeAt(pos.offset) === 101) {
                    result0 = "e";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"e\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos.offset, 2) === "e+") {
                        result0 = "e+";
                        advance(pos, 2);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"e+\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos.offset, 2) === "e-") {
                            result0 = "e-";
                            advance(pos, 2);
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"e-\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos.offset) === 69) {
                                result0 = "E";
                                advance(pos, 1);
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"E\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.substr(pos.offset, 2) === "E+") {
                                    result0 = "E+";
                                    advance(pos, 2);
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"E+\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.substr(pos.offset, 2) === "E-") {
                                        result0 = "E-";
                                        advance(pos, 2);
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"E-\"");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return result0;
            }