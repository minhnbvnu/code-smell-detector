function parse_crlf() {
                var result0;

                if (/^[\n\r\u2028\u2029]/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[\\n\\r\\u2028\\u2029]");
                    }
                }
                return result0;
            }