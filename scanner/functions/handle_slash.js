function handle_slash() {
                next();
                switch (peek()) {
                    case "/":
                        next();
                        return skip_line_comment("comment1");
                    case "*":
                        next();
                        return skip_multiline_comment();
                }
                return S.regex_allowed ? read_regexp("") : read_operator("/");
            }