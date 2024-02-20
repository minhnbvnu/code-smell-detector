function extract_args() {
                    var iife, fn = compressor.self();
                    if (is_func_expr(fn)
                        && !fn.name
                        && !fn.uses_arguments
                        && !fn.pinned()
                        && (iife = compressor.parent()) instanceof AST_Call
                        && iife.expression === fn
                        && iife.args.every((arg) => !(arg instanceof AST_Expansion))) {
                        var fn_strict = compressor.has_directive("use strict");
                        if (fn_strict && !member(fn_strict, fn.body))
                            fn_strict = false;
                        var len = fn.argnames.length;
                        args = iife.args.slice(len);
                        var names = new Set();
                        for (var i = len; --i >= 0;) {
                            var sym = fn.argnames[i];
                            var arg = iife.args[i];
                            // The following two line fix is a duplicate of the fix at
                            // https://github.com/terser/terser/commit/011d3eb08cefe6922c7d1bdfa113fc4aeaca1b75
                            // This might mean that these two pieces of code (one here in collapse_vars and another in reduce_vars
                            // Might be doing the exact same thing.
                            const def = sym.definition && sym.definition();
                            const is_reassigned = def && def.orig.length > 1;
                            if (is_reassigned)
                                continue;
                            args.unshift(make_node(AST_VarDef, sym, {
                                name: sym,
                                value: arg
                            }));
                            if (names.has(sym.name))
                                continue;
                            names.add(sym.name);
                            if (sym instanceof AST_Expansion) {
                                var elements = iife.args.slice(i);
                                if (elements.every((arg) => !has_overlapping_symbol(fn, arg, fn_strict))) {
                                    candidates.unshift([make_node(AST_VarDef, sym, {
                                            name: sym.expression,
                                            value: make_node(AST_Array, iife, {
                                                elements: elements
                                            })
                                        })]);
                                }
                            }
                            else {
                                if (!arg) {
                                    arg = make_node(AST_Undefined, sym).transform(compressor);
                                }
                                else if (arg instanceof AST_Lambda && arg.pinned()
                                    || has_overlapping_symbol(fn, arg, fn_strict)) {
                                    arg = null;
                                }
                                if (arg)
                                    candidates.unshift([make_node(AST_VarDef, sym, {
                                            name: sym,
                                            value: arg
                                        })]);
                            }
                        }
                    }
                }