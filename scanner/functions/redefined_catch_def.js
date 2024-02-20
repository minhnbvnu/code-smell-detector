function redefined_catch_def(def) {
            if (def.orig[0] instanceof AST_SymbolCatch
                && def.scope.is_block_scope()) {
                return def.scope.get_defun_scope().variables.get(def.name);
            }
        }