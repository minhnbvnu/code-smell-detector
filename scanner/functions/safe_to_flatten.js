function safe_to_flatten(value, compressor) {
            if (value instanceof AST_SymbolRef) {
                value = value.fixed_value();
            }
            if (!value)
                return false;
            if (!(value instanceof AST_Lambda || value instanceof AST_Class))
                return true;
            if (!(value instanceof AST_Lambda && value.contains_this()))
                return true;
            return compressor.parent() instanceof AST_New;
        }