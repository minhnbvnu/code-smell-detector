function parse_Comment() {
                var result0;

                result0 = parse_LineComment();
                if (result0 === null) {
                    result0 = parse_BlockComment();
                }
                return result0;
            }