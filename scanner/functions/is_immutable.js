function is_immutable(value) {
            if (!value)
                return false;
            return value.is_constant()
                || value instanceof AST_Lambda
                || value instanceof AST_This;
        }