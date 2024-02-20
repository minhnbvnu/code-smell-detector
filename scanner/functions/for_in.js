function for_in(init) {
                var obj = expression(true);
                expect(")");
                return new AST_ForIn({
                    init: init,
                    object: obj,
                    body: in_loop(function () { return statement(false, true); })
                });
            }