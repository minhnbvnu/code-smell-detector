function parse_Exp() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = parse_e();
                if (result0 !== null) {
                    result1 = parse_Int();
                    result1 = result1 !== null ? result1 : "";
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos0);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos0);
                }
                return result0;
            }