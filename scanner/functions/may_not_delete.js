function may_not_delete(node) {
            return node instanceof AST_Infinity
                || node instanceof AST_NaN
                || node instanceof AST_NewTarget
                || node instanceof AST_PropAccess
                || node instanceof AST_SymbolRef
                || node instanceof AST_Undefined;
        }