function can_inject_symbols() {
                var block_scoped = new Set();
                do {
                    scope = compressor.parent(++level);
                    if (scope.is_block_scope() && scope.block_scope) {
                        // TODO this is sometimes undefined during compression.
                        // But it should always have a value!
                        scope.block_scope.variables.forEach(function (variable) {
                            block_scoped.add(variable.name);
                        });
                    }
                    if (scope instanceof AST_Catch) {
                        // TODO can we delete? AST_Catch is a block scope.
                        if (scope.argname) {
                            block_scoped.add(scope.argname.name);
                        }
                    }
                    else if (scope instanceof AST_IterationStatement) {
                        in_loop = [];
                    }
                    else if (scope instanceof AST_SymbolRef) {
                        if (scope.fixed_value() instanceof AST_Scope)
                            return false;
                    }
                } while (!(scope instanceof AST_Scope));
                var safe_to_inject = !(scope instanceof AST_Toplevel) || compressor.toplevel.vars;
                var inline = compressor.option("inline");
                if (!can_inject_vars(block_scoped, inline >= 3 && safe_to_inject))
                    return false;
                if (!can_inject_args(block_scoped, inline >= 2 && safe_to_inject))
                    return false;
                return !in_loop || in_loop.length == 0 || !is_reachable(fn, in_loop);
            }