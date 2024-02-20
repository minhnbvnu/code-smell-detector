function hex_bytes(n, strict_hex) {
                var num = 0;
                for (; n > 0; --n) {
                    if (!strict_hex && isNaN(parseInt(peek(), 16))) {
                        return parseInt(num, 16) || "";
                    }
                    var digit = next(true);
                    if (isNaN(parseInt(digit, 16)))
                        parse_error("Invalid hex-character pattern in string");
                    num += digit;
                }
                return parseInt(num, 16);
            }