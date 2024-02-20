function remove_candidate(expr) {
                    if (expr.name instanceof AST_SymbolFunarg) {
                        var iife = compressor.parent(), argnames = compressor.self().argnames;
                        var index = argnames.indexOf(expr.name);
                        if (index < 0) {
                            iife.args.length = Math.min(iife.args.length, argnames.length - 1);
                        }
                        else {
                            var args = iife.args;
                            if (args[index])
                                args[index] = make_node(AST_Number, args[index], {
                                    value: 0
                                });
                        }
                        return true;
                    }
                    var found = false;
                    return statements[stat_index].transform(new TreeTransformer(function (node, descend, in_list) {
                        if (found)
                            return node;
                        if (node === expr || node.body === expr) {
                            found = true;
                            if (node instanceof AST_VarDef) {
                                node.value = node.name instanceof AST_SymbolConst
                                    ? make_node(AST_Undefined, node.value) // `const` always needs value.
                                    : null;
                                return node;
                            }
                            return in_list ? MAP.skip : null;
                        }
                    }, function (node) {
                        if (node instanceof AST_Sequence)
                            switch (node.expressions.length) {
                                case 0: return null;
                                case 1: return node.expressions[0];
                            }
                    }));
                }