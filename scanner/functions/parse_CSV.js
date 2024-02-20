function parse_CSV() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_insig();
                if (result0 !== null) {
                    result1 = parse_CSVMember();
                    if (result1 !== null) {
                        result2 = parse_insig();
                        if (result2 !== null) {
                            result3 = [];
                            result4 = parse_CommaCSVMember();
                            while (result4 !== null) {
                                result3.push(result4);
                                result4 = parse_CommaCSVMember();
                            }
                            if (result3 !== null) {
                                result0 = [result0, result1, result2, result3];
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, c, carr) {
                        var res = [c.value || c];
                        collect(carr,',', res, 'value');
                        return {
                            value: res
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[1], result0[3]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }