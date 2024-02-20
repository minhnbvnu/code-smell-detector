function is_lhs_read_only(lhs) {
            if (lhs instanceof AST_This)
                return true;
            if (lhs instanceof AST_SymbolRef)
                return lhs.definition().orig[0] instanceof AST_SymbolLambda;
            if (lhs instanceof AST_PropAccess) {
                lhs = lhs.expression;
                if (lhs instanceof AST_SymbolRef) {
                    if (lhs.is_immutable())
                        return false;
                    lhs = lhs.fixed_value();
                }
                if (!lhs)
                    return true;
                if (lhs instanceof AST_RegExp)
                    return false;
                if (lhs instanceof AST_Constant)
                    return true;
                return is_lhs_read_only(lhs);
            }
            return false;
        }