function to_class_expr(defcl, drop_name) {
        var cl = make_node(AST_ClassExpression, defcl, defcl);
        cl.name = drop_name ? null : make_node(AST_SymbolClass, defcl.name, defcl.name);
        return cl;
    }