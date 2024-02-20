function handle_dot() {
                next();
                if (is_digit(peek().charCodeAt(0))) {
                    return read_num(".");
                }
                if (peek() === ".") {
                    next(); // Consume second dot
                    next(); // Consume third dot
                    return token("expand", "...");
                }
                return token("punc", ".");
            }