function read_escaped_char(in_string, strict_hex, template_string) {
                var ch = next(true, in_string);
                switch (ch.charCodeAt(0)) {
                    case 110: return "\n";
                    case 114: return "\r";
                    case 116: return "\t";
                    case 98: return "\b";
                    case 118: return "\u000b"; // \v
                    case 102: return "\f";
                    case 120: return String.fromCharCode(hex_bytes(2, strict_hex)); // \x
                    case 117: // \u
                        if (peek() == "{") {
                            next(true);
                            if (peek() === "}")
                                parse_error("Expecting hex-character between {}");
                            while (peek() == "0")
                                next(true); // No significance
                            var result, length = find("}", true) - S.pos;
                            // Avoid 32 bit integer overflow (1 << 32 === 1)
                            // We know first character isn't 0 and thus out of range anyway
                            if (length > 6 || (result = hex_bytes(length, strict_hex)) > 0x10FFFF) {
                                parse_error("Unicode reference out of bounds");
                            }
                            next(true);
                            return from_char_code(result);
                        }
                        return String.fromCharCode(hex_bytes(4, strict_hex));
                    case 10: return ""; // newline
                    case 13: // \r
                        if (peek() == "\n") { // DOS newline
                            next(true, in_string);
                            return "";
                        }
                }
                if (is_octal(ch)) {
                    if (template_string && strict_hex) {
                        const represents_null_character = ch === "0" && !is_octal(peek());
                        if (!represents_null_character) {
                            parse_error("Octal escape sequences are not allowed in template strings");
                        }
                    }
                    return read_octal_escape_sequence(ch, strict_hex);
                }
                return ch;
            }