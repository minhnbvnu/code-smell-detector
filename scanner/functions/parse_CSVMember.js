function parse_CSVMember() {
                var result0;

                result0 = parse_QuotedWord();
                if (result0 === null) {
                    result0 = parse_QuotedDigits();
                    if (result0 === null) {
                        result0 = parse_Digits();
                        if (result0 === null) {
                            result0 = parse_Ref();
                        }
                    }
                }
                return result0;
            }