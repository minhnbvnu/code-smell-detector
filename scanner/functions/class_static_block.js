function class_static_block() {
                if (!is("punc", "{")) {
                    return null;
                }
                const start = S.token;
                const body = [];
                next();
                while (!is("punc", "}")) {
                    body.push(statement());
                }
                next();
                return new AST_ClassStaticBlock({ start, body, end: prev() });
            }