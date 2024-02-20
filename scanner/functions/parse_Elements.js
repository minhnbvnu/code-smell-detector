function parse_Elements() {
                var result0, result1, result2, result3, result4;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_Value();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_Comma();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_Elements();
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
                                } else {
                                    result0 = null;
                                    pos = clone(pos0);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos0);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos0);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos0);
                }
                if (result0 === null) {
                    result0 = parse_Value();
                }
                return result0;
            }