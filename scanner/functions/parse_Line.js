function parse_Line() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Assign();
                if (result0 === null) {
                    result0 = parse_Comment();
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, l) {
                        if(l.type !== 'comment') {
                            l.id = id++;
                        }
                        return l;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }