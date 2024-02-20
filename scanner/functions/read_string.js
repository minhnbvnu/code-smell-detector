function read_string() {
                return with_eof_error("Unterminated string constant", function(){
                        var quote = next(), ret = "";
                        for (;;) {
                                var ch = next(true);
                                if (ch == "\\") ch = read_escaped_char();
                                else if (ch == quote) break;
                                ret += ch;
                        }
                        return token("string", ret);
                });
        }