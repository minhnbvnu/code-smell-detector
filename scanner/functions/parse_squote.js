function parse_squote() {
                var result0;

                if (/^[']/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[']");
                    }
                }
                return result0;
            }