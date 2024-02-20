function parse_UDFParam() {
                var result0;

                result0 = parse_LiteralParam();
                if (result0 === null) {
                    result0 = parse_Column();
                }
                return result0;
            }