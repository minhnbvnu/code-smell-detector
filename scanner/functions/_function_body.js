function _function_body(block, generator, is_async, name, args) {
                var loop = S.in_loop;
                var labels = S.labels;
                var current_generator = S.in_generator;
                var current_async = S.in_async;
                ++S.in_function;
                if (generator)
                    S.in_generator = S.in_function;
                if (is_async)
                    S.in_async = S.in_function;
                if (args)
                    parameters(args);
                if (block)
                    S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                if (block) {
                    S.input.push_directives_stack();
                    var a = block_();
                    if (name)
                        _verify_symbol(name);
                    if (args)
                        args.forEach(_verify_symbol);
                    S.input.pop_directives_stack();
                }
                else {
                    var a = [new AST_Return({
                            start: S.token,
                            value: expression(false),
                            end: S.token
                        })];
                }
                --S.in_function;
                S.in_loop = loop;
                S.labels = labels;
                S.in_generator = current_generator;
                S.in_async = current_async;
                return a;
            }