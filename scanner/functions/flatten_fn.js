function flatten_fn(returned_value) {
                var decls = [];
                var expressions = [];
                flatten_args(decls, expressions);
                flatten_vars(decls, expressions);
                expressions.push(returned_value);
                if (decls.length) {
                    const i = scope.body.indexOf(compressor.parent(level - 1)) + 1;
                    scope.body.splice(i, 0, make_node(AST_Var, fn, {
                        definitions: decls
                    }));
                }
                return expressions.map(exp => exp.clone(true));
            }