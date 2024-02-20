function read_octal_escape_sequence(ch, strict_octal) {
                // Read
                var p = peek();
                if (p >= "0" && p <= "7") {
                    ch += next(true);
                    if (ch[0] <= "3" && (p = peek()) >= "0" && p <= "7")
                        ch += next(true);
                }
                // Parse
                if (ch === "0")
                    return "\0";
                if (ch.length > 0 && next_token.has_directive("use strict") && strict_octal)
                    parse_error("Legacy octal escape sequences are not allowed in strict mode");
                return String.fromCharCode(parseInt(ch, 8));
            }