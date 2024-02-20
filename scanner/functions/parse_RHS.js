function parse_RHS() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_QuotedWord();
                if (result0 === null) {
                    result0 = parse_QuotedDigits();
                    if (result0 === null) {
                        result0 = parse_Digits();
                        if (result0 === null) {
                            result0 = parse_AliasedRef();
                        }
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, r) {
                        if(!r.hasOwnProperty('value')) {
                            r = {
                                value: r
                            }
                        }
                        return r;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }