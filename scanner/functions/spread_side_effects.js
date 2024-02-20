function spread_side_effects(exp) {
        while ((exp = exp.tail_node()) instanceof AST_SymbolRef) {
            exp = exp.fixed_value();
            if (!exp) return true;
        }
        return !(exp instanceof AST_Array
            || exp.TYPE == "Binary" && !lazy_op[exp.operator]
            || exp instanceof AST_Constant
            || exp instanceof AST_Lambda
            || exp instanceof AST_Object && all(exp.properties, function(prop) {
                return !(prop instanceof AST_ObjectGetter || prop instanceof AST_Spread);
            })
            || exp instanceof AST_ObjectIdentity
            || exp instanceof AST_Unary);
    }