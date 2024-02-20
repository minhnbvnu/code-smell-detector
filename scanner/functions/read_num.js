function read_num(prefix) {
                var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".", is_big_int = false, numeric_separator = false;
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
                if (prefix)
                    num = prefix + num;
                LATEST_RAW = num;
                if (RE_OCT_NUMBER.test(num) && next_token.has_directive("use strict")) {
                    parse_error("Legacy octal literals are not allowed in strict mode");
                }
                if (numeric_separator) {
                    if (num.endsWith("_")) {
                        parse_error("Numeric separators are not allowed at the end of numeric literals");
                    }
                    else if (num.includes("__")) {
                        parse_error("Only one underscore is allowed as numeric separator");
                    }
                    num = num.replace(/_/g, "");
                }
                if (num.endsWith("n")) {
                    const without_n = num.slice(0, -1);
                    const allow_e = RE_HEX_NUMBER.test(without_n);
                    const valid = parse_js_number(without_n, allow_e);
                    if (!has_dot && RE_BIG_INT.test(num) && !isNaN(valid))
                        return token("big_int", without_n);
                    parse_error("Invalid or unexpected token");
                }
                var valid = parse_js_number(num);
                if (!isNaN(valid)) {
                    return token("num", valid);
                }
                else {
                    parse_error("Invalid syntax: " + num);
                }
            }