function parse_pClause() {
                var result0;

                result0 = parse_IfClause();
                if (result0 === null) {
                    result0 = parse_TryClause();
                }
                return result0;
            }