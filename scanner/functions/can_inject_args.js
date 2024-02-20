function can_inject_args(block_scoped, safe_to_inject) {
                for (var i = 0, len = fn.argnames.length; i < len; i++) {
                    var arg = fn.argnames[i];
                    if (arg instanceof AST_DefaultAssign) {
                        if (has_flag(arg.left, UNUSED))
                            continue;
                        return false;
                    }
                    if (arg instanceof AST_Destructuring)
                        return false;
                    if (arg instanceof AST_Expansion) {
                        if (has_flag(arg.expression, UNUSED))
                            continue;
                        return false;
                    }
                    if (has_flag(arg, UNUSED))
                        continue;
                    if (!safe_to_inject
                        || block_scoped.has(arg.name)
                        || identifier_atom.has(arg.name)
                        || scope.conflicting_def(arg.name)) {
                        return false;
                    }
                    if (in_loop)
                        in_loop.push(arg.definition());
                }
                return true;
            }