function get_simple_key(key) {
            if (key instanceof AST_Constant) {
                return key.getValue();
            }
            if (key instanceof AST_UnaryPrefix
                && key.operator == "void"
                && key.expression instanceof AST_Constant) {
                return;
            }
            return key;
        }