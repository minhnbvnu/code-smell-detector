function handle_eq_sign() {
                next();
                if (peek() === ">") {
                    next();
                    return token("arrow", "=>");
                }
                else {
                    return read_operator("=");
                }
            }