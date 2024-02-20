function parse_LogicStatement() {
                var result0;

                result0 = parse_LogicParen();
                if (result0 === null) {
                    result0 = parse_LogicPhrase();
                }
                return result0;
            }