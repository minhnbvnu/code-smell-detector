function try_() {
                var body, bcatch = null, bfinally = null;
                body = new AST_TryBlock({
                    start: S.token,
                    body: block_(),
                    end: prev(),
                });
                if (is("keyword", "catch")) {
                    var start = S.token;
                    next();
                    if (is("punc", "{")) {
                        var name = null;
                    }
                    else {
                        expect("(");
                        var name = parameter(undefined, AST_SymbolCatch);
                        expect(")");
                    }
                    bcatch = new AST_Catch({
                        start: start,
                        argname: name,
                        body: block_(),
                        end: prev()
                    });
                }
                if (is("keyword", "finally")) {
                    var start = S.token;
                    next();
                    bfinally = new AST_Finally({
                        start: start,
                        body: block_(),
                        end: prev()
                    });
                }
                if (!bcatch && !bfinally)
                    croak("Missing catch/finally blocks");
                return new AST_Try({
                    body: body,
                    bcatch: bcatch,
                    bfinally: bfinally
                });
            }