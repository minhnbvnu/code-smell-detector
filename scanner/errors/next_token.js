function next_token(force_regexp) {
                if (force_regexp != null)
                    return read_regexp(force_regexp);
                if (shebang && S.pos == 0 && looking_at("#!")) {
                    start_token();
                    forward(2);
                    skip_line_comment("comment5");
                }
                for (;;) {
                    skip_whitespace();
                    start_token();
                    if (html5_comments) {
                        if (looking_at("<!--")) {
                            forward(4);
                            skip_line_comment("comment3");
                            continue;
                        }
                        if (looking_at("-->") && S.newline_before) {
                            forward(3);
                            skip_line_comment("comment4");
                            continue;
                        }
                    }
                    var ch = peek();
                    if (!ch)
                        return token("eof");
                    var code = ch.charCodeAt(0);
                    switch (code) {
                        case 34:
                        case 39: return read_string();
                        case 46: return handle_dot();
                        case 47: {
                            var tok = handle_slash();
                            if (tok === next_token)
                                continue;
                            return tok;
                        }
                        case 61: return handle_eq_sign();
                        case 63: {
                            if (!is_option_chain_op())
                                break; // Handled below
                            next(); // ?
                            next(); // .
                            return token("punc", "?.");
                        }
                        case 96: return read_template_characters(true);
                        case 123:
                            S.brace_counter++;
                            break;
                        case 125:
                            S.brace_counter--;
                            if (S.template_braces.length > 0
                                && S.template_braces[S.template_braces.length - 1] === S.brace_counter)
                                return read_template_characters(false);
                            break;
                    }
                    if (is_digit(code))
                        return read_num();
                    if (PUNC_CHARS.has(ch))
                        return token("punc", next());
                    if (OPERATOR_CHARS.has(ch))
                        return read_operator();
                    if (code == 92 || is_identifier_start(ch))
                        return read_word();
                    if (code == 35)
                        return read_private_word();
                    break;
                }
                parse_error("Unexpected character '" + ch + "'");
            }