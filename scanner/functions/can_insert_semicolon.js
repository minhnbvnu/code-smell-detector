function can_insert_semicolon() {
                return !options.strict
                    && (is("eof") || is("punc", "}") || has_newline_before(S.token));
            }