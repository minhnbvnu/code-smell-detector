function walk_scope(descend) {
            node.init_vars(scope);
            var save_defun = defun;
            var save_scope = scope;
            if (node instanceof AST_Scope) defun = node;
            scope = node;
            descend();
            scope = save_scope;
            defun = save_defun;
        }