function skip_whitespace() {
                while (WHITESPACE_CHARS.has(peek()))
                    next();
            }