function parse_Int() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                if (input.charCodeAt(pos.offset) === 43) {
                    result0 = "+";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"+\"");
                    }
                }
                result0 = result0 !== null ? result0 : "";
                if (result0 !== null) {
                    result1 = parse_Digits();
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos0);
                }
                if (result0 === null) {
                    pos0 = clone(pos);
                    if (input.charCodeAt(pos.offset) === 45) {
                        result0 = "-";
                        advance(pos, 1);
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"-\"");
                        }
                    }
                    if (result0 !== null) {
                        result1 = parse_Digits();
                        if (result1 !== null) {
                            result0 = [result0, result1];
                        } else {
                            result0 = null;
                            pos = clone(pos0);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                }
                return result0;
            }