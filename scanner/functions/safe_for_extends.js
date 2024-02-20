function safe_for_extends(node) {
        return node instanceof AST_Class || node instanceof AST_Defun || node instanceof AST_Function;
    }