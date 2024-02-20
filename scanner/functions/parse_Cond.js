function parse_Cond() {
                var result0;

                result0 = parse_EqCond();
                if (result0 === null) {
                    result0 = parse_InCond();
                    if (result0 === null) {
                        result0 = parse_UDF();
                    }
                }
                return result0;
            }