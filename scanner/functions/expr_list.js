function expr_list(closing, allow_trailing_comma, allow_empty) {
                var first = true, a = [];
                while (!is("punc", closing)) {
                    if (first)
                        first = false;
                    else
                        expect(",");
                    if (allow_trailing_comma && is("punc", closing))
                        break;
                    if (is("punc", ",") && allow_empty) {
                        a.push(new AST_Hole({ start: S.token, end: S.token }));
                    }
                    else if (is("expand", "...")) {
                        next();
                        a.push(new AST_Expansion({ start: prev(), expression: expression(), end: S.token }));
                    }
                    else {
                        a.push(expression(false));
                    }
                }
                next();
                return a;
            }