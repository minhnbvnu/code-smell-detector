function is_atomic(lhs, self) {
            return lhs instanceof AST_SymbolRef || lhs.TYPE === self.TYPE;
        }