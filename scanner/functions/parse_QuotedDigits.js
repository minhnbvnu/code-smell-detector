function parse_QuotedDigits() {
                var result0;

                result0 = parse_sQuotedDigits();
                if (result0 === null) {
                    result0 = parse_dQuotedDigits();
                }
                return result0;
            }