function parse_Verb() {
                var result0;

                result0 = parse_httpVerb();
                if (result0 === null) {
                    result0 = parse_generalVerb();
                }
                return result0;
            }