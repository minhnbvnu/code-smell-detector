function read_line_comment() {
                next();
                var i = find("\n"), ret;
                if (i == -1) {
                        ret = S.text.substr(S.pos);
                        S.pos = S.text.length;
                } else {
                        ret = S.text.substring(S.pos, i);
                        S.pos = i;
                }
                return token("comment1", ret, true);
        }