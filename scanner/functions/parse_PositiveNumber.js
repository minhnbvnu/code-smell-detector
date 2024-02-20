function parse_PositiveNumber() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                if (/^[0-9]/.test(input.charAt(pos.offset))) {
                    result1 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[0-9]");
                    }
                }
                if (result1 !== null) {
                    result0 = [];
                    while (result1 !== null) {
                        result0.push(result1);
                        if (/^[0-9]/.test(input.charAt(pos.offset))) {
                            result1 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[0-9]");
                            }
                        }
                    }
                } else {
                    result0 = null;
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, d) {
                        return parseInt(d.join(''));
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }