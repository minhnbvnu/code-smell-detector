function parse_RetRef() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Word();
                if (result0 !== null) {
                    result0 = (function(offset, line, column, o) {
                        if(symbols[o] === undefined) {
                            throw new this.SyntaxError("Line " + line + ": Unresolved symbol '" + o + "'");
                        }
                        return {
                            ref: o,
                            type: 'ref'
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }