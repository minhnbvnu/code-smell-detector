function parse_template() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = [];
                result1 = parse_expression();
                if (result1 === null) {
                    result1 = parse_literal();
                }
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_expression();
                    if (result1 === null) {
                        result1 = parse_literal();
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, c) {
                        var o = [];
                        o.push(c[0]);
                        var current = 0;
                        for(var i = 1; i < c.length; i++) {
                            if(typeof c[i] === 'string' && typeof o[current] === 'string') {
                                o[current] = o[current] + c[i];
                            }
                            else {
                                o.push(c[i]);
                                current++;
                            }
                        }
                        return {
                            format: function(bag, keep) {
                                return _format('', o, bag, keep);
                            },
                            vars: vars(o),
                            stream: o
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }