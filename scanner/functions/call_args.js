function call_args() {
                var args = [];
                while (!is("punc", ")")) {
                    if (is("expand", "...")) {
                        next();
                        args.push(new AST_Expansion({
                            start: prev(),
                            expression: expression(false),
                            end: prev()
                        }));
                    }
                    else {
                        args.push(expression(false));
                    }
                    if (!is("punc", ")")) {
                        expect(",");
                    }
                }
                next();
                return args;
            }