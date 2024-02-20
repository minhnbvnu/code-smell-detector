function parse_QuotedWord() {
                var result0;

                result0 = parse_sQuotedWord();
                if (result0 === null) {
                    result0 = parse_dQuotedWord();
                }
                return result0;
            }