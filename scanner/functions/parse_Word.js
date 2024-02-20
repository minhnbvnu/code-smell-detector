function parse_Word() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (/^[a-zA-Z$:]/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[a-zA-Z$:]");
                    }
                }
                if (result0 !== null) {
                    result1 = [];
                    if (/^[a-zA-Z_0-9:]/.test(input.charAt(pos.offset))) {
                        result2 = input.charAt(pos.offset);
                        advance(pos, 1);
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("[a-zA-Z_0-9:]");
                        }
                    }
                    while (result2 !== null) {
                        result1.push(result2);
                        if (/^[a-zA-Z_0-9:]/.test(input.charAt(pos.offset))) {
                            result2 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("[a-zA-Z_0-9:]");
                            }
                        }
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, chars) {
                        var ret = chars[0];
                        for(i = 1; i < chars.length; i++) {
                            ret = ret + chars[i].join('');
                        }
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }