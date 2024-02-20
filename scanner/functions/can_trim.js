function can_trim(node) {
                return node instanceof AST_Assign && node.operator == "=";
            }