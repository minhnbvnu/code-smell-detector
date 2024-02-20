function find_eol() {
                var text = S.text;
                for (var i = S.pos, n = S.text.length; i < n; ++i) {
                    var ch = text[i];
                    if (NEWLINE_CHARS.has(ch))
                        return i;
                }
                return -1;
            }