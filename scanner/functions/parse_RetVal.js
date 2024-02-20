function parse_RetVal() {
                var result0;

                result0 = parse_Statement();
                if (result0 === null) {
                    result0 = parse_CallUdf();
                    if (result0 === null) {
                        result0 = parse_RetRef();
                        if (result0 === null) {
                            result0 = parse_Value();
                        }
                    }
                }
                return result0;
            }