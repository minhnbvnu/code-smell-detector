function switch_body_() {
                expect("{");
                var a = [], cur = null, branch = null, tmp;
                while (!is("punc", "}")) {
                    if (is("eof"))
                        unexpected();
                    if (is("keyword", "case")) {
                        if (branch)
                            branch.end = prev();
                        cur = [];
                        branch = new AST_Case({
                            start: (tmp = S.token, next(), tmp),
                            expression: expression(true),
                            body: cur
                        });
                        a.push(branch);
                        expect(":");
                    }
                    else if (is("keyword", "default")) {
                        if (branch)
                            branch.end = prev();
                        cur = [];
                        branch = new AST_Default({
                            start: (tmp = S.token, next(), expect(":"), tmp),
                            body: cur
                        });
                        a.push(branch);
                    }
                    else {
                        if (!cur)
                            unexpected();
                        cur.push(statement());
                    }
                }
                if (branch)
                    branch.end = prev();
                next();
                return a;
            }