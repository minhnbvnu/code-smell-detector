function parse_StatementOrObject() {
                var result0;

                result0 = parse_Statement();
                if (result0 === null) {
                    result0 = parse_Value();
                    if (result0 === null) {
                        result0 = parse_CallUdf();
                    }
                }
                return result0;
            }