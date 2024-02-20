function is_assignable(expr) {
                return expr instanceof AST_PropAccess || expr instanceof AST_SymbolRef;
            }