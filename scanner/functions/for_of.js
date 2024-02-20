function for_of(init, is_await) {
                var lhs = init instanceof AST_Definitions ? init.definitions[0].name : null;
                var obj = expression(true);
                expect(")");
                return new AST_ForOf({
                    await: is_await,
                    init: init,
                    name: lhs,
                    object: obj,
                    body: in_loop(function () { return statement(false, true); })
                });
            }