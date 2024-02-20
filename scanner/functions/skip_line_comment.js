function skip_line_comment(type) {
                var regex_allowed = S.regex_allowed;
                var i = find_eol(), ret;
                if (i == -1) {
                    ret = S.text.substr(S.pos);
                    S.pos = S.text.length;
                }
                else {
                    ret = S.text.substring(S.pos, i);
                    S.pos = i;
                }
                S.col = S.tokcol + (S.pos - S.tokpos);
                S.comments_before.push(token(type, ret, true));
                S.regex_allowed = regex_allowed;
                return next_token;
            }