function may_modify(sym) {
                    if (!sym.definition)
                        return true; // AST_Destructuring
                    var def = sym.definition();
                    if (def.orig.length == 1 && def.orig[0] instanceof AST_SymbolDefun)
                        return false;
                    if (def.scope.get_defun_scope() !== defun_scope)
                        return true;
                    return def.references.some((ref) => ref.scope.get_defun_scope() !== defun_scope);
                }