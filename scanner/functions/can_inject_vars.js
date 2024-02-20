function can_inject_vars(block_scoped, safe_to_inject) {
                var len = fn.body.length;
                for (var i = 0; i < len; i++) {
                    var stat = fn.body[i];
                    if (!(stat instanceof AST_Var))
                        continue;
                    if (!safe_to_inject)
                        return false;
                    for (var j = stat.definitions.length; --j >= 0;) {
                        var name = stat.definitions[j].name;
                        if (name instanceof AST_Destructuring
                            || block_scoped.has(name.name)
                            || identifier_atom.has(name.name)
                            || scope.conflicting_def(name.name)) {
                            return false;
                        }
                        if (in_loop)
                            in_loop.push(name.definition());
                    }
                }
                return true;
            }