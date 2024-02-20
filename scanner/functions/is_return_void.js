function is_return_void(value) {
                    return !value || value instanceof AST_UnaryPrefix && value.operator == "void";
                }