function parse_sp() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = [];
                if (/^[\t]/.test(input.charAt(pos.offset))) {
                    result1 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[\\t]");
                    }
                }
                if (result1 === null) {
                    if (/^[ ]/.test(input.charAt(pos.offset))) {
                        result1 = input.charAt(pos.offset);
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[ ]");
                        }
                    }
                }
                while (result1 !== null) {
                    result0.push(result1);
                    if (/^[\t]/.test(input.charAt(pos.offset))) {
                        result1 = input.charAt(pos.offset);
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[\\t]");
                        }
                    }
                    if (result1 === null) {
                        if (/^[ ]/.test(input.charAt(pos.offset))) {
                            result1 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[ ]");
                            }
                        }
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return ''
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }