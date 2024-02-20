function for_() {
                var for_await_error = "`for await` invalid in this context";
                var await_tok = S.token;
                if (await_tok.type == "name" && await_tok.value == "await") {
                    if (!can_await()) {
                        token_error(await_tok, for_await_error);
                    }
                    next();
                }
                else {
                    await_tok = false;
                }
                expect("(");
                var init = null;
                if (!is("punc", ";")) {
                    init =
                        is("keyword", "var") ? (next(), var_(true)) :
                            is("keyword", "let") ? (next(), let_(true)) :
                                is("keyword", "const") ? (next(), const_(true)) :
                                    expression(true, true);
                    var is_in = is("operator", "in");
                    var is_of = is("name", "of");
                    if (await_tok && !is_of) {
                        token_error(await_tok, for_await_error);
                    }
                    if (is_in || is_of) {
                        if (init instanceof AST_Definitions) {
                            if (init.definitions.length > 1)
                                token_error(init.start, "Only one variable declaration allowed in for..in loop");
                        }
                        else if (!(is_assignable(init) || (init = to_destructuring(init)) instanceof AST_Destructuring)) {
                            token_error(init.start, "Invalid left-hand side in for..in loop");
                        }
                        next();
                        if (is_in) {
                            return for_in(init);
                        }
                        else {
                            return for_of(init, !!await_tok);
                        }
                    }
                }
                else if (await_tok) {
                    token_error(await_tok, for_await_error);
                }
                return regular_for(init);
            }