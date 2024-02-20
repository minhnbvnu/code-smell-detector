function parse_LogicPhrase() {
                var result0;

                result0 = parse_OrPhrase();
                if (result0 === null) {
                    result0 = parse_AndPhrase();
                    if (result0 === null) {
                        result0 = parse_NotPhrase();
                        if (result0 === null) {
                            result0 = parse_NormalPhrase();
                        }
                    }
                }
                return result0;
            }