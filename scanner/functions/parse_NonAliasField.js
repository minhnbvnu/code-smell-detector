function parse_NonAliasField() {
                var result0;

                result0 = parse_UDF();
                if (result0 === null) {
                    result0 = parse_Column();
                }
                return result0;
            }