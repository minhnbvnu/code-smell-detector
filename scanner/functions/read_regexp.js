function read_regexp() {
                return with_eof_error("Unterminated regular expression", function(){
                        var prev_backslash = false, regexp = "", ch, in_class = false;
                        while ((ch = next(true))) if (prev_backslash) {
                                regexp += "\\" + ch;
                                prev_backslash = false;
                        } else if (ch == "[") {
                                in_class = true;
                                regexp += ch;
                        } else if (ch == "]" && in_class) {
                                in_class = false;
                                regexp += ch;
                        } else if (ch == "/" && !in_class) {
                                break;
                        } else if (ch == "\\") {
                                prev_backslash = true;
                        } else {
                                regexp += ch;
                        }
                        var mods = read_name();
                        return token("regexp", [ regexp, mods ]);
                });
        }