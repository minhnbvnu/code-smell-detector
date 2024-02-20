function parse_hexDigit() {
                var result0;

                if (/^[0-9a-fA-F]/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[0-9a-fA-F]");
                    }
                }
                return result0;
            }