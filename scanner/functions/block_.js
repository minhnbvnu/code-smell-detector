function block_() {
                expect("{");
                var a = [];
                while (!is("punc", "}")) {
                    if (is("eof"))
                        unexpected();
                    a.push(statement());
                }
                next();
                return a;
            }