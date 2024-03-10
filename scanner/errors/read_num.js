                var num = read_while(function (ch, i) {
                    if (is_big_int)
                        return false;
                    var code = ch.charCodeAt(0);
                    switch (code) {
                        case 95: // _
                            return (numeric_separator = true);
                        case 98:
                        case 66: // bB
                            return (has_x = true); // Can occur in hex sequence, don't return false yet
                        case 111:
                        case 79: // oO
                        case 120:
                        case 88: // xX
                            return has_x ? false : (has_x = true);
                        case 101:
                        case 69: // eE
                            return has_x ? true : has_e ? false : (has_e = after_e = true);
                        case 45: // -
                            return after_e || (i == 0 && !prefix);
                        case 43: // +
                            return after_e;
                        case (after_e = false, 46): // .
                            return (!has_dot && !has_x && !has_e) ? (has_dot = true) : false;
                    }
                    if (ch === "n") {
                        is_big_int = true;
                        return true;
                    }
                    return RE_NUM_LITERAL.test(ch);
                });