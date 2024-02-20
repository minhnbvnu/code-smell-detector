function regular_for(init) {
                expect(";");
                var test = is("punc", ";") ? null : expression(true);
                expect(";");
                var step = is("punc", ")") ? null : expression(true);
                expect(")");
                return new AST_For({
                    init: init,
                    condition: test,
                    step: step,
                    body: in_loop(function () { return statement(false, true); })
                });
            }