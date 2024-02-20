function can_be_evicted_from_block(node) {
            return !(node instanceof AST_DefClass ||
                node instanceof AST_Defun ||
                node instanceof AST_Let ||
                node instanceof AST_Const ||
                node instanceof AST_Export ||
                node instanceof AST_Import);
        }