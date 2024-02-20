function handle_regexp() {
                if (is("operator", "/") || is("operator", "/=")) {
                    S.peeked = null;
                    S.token = S.input(S.token.value.substr(1)); // force regexp
                }
            }