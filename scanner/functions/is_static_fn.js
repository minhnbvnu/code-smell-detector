function is_static_fn(node) {
        if (!(node instanceof AST_Dot)) return false;
        var expr = node.expression;
        if (!is_undeclared_ref(expr)) return false;
        var static_fn = static_fns[expr.name];
        return static_fn && (static_fn[node.property] || expr.name == "Math" && node.property == "random");
    }