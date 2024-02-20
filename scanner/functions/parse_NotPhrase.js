function parse_NotPhrase() {
                var result0, result1;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.charCodeAt(pos.offset) === 33) {
                    result0 = "!";
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"!\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_LogicParen();
                    if (result1 === null) {
                        result1 = parse_NotPhrase();
                        if (result1 === null) {
                            result1 = parse_NormalPhrase();
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
                    result0 = (function(offset, line, column, s) {
                        return {
                            type: 'logic',
                            logic : 'not',
                            id : id++,
                            line : line,
                            values : s
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[1]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }