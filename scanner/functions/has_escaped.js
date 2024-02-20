function has_escaped(d, scope, node, parent) {
        if (parent instanceof AST_Assign) return parent.operator == "=" && parent.right === node;
        if (parent instanceof AST_Call) return parent.expression !== node || parent instanceof AST_New;
        if (parent instanceof AST_Exit) return parent.value === node && scope.resolve() !== d.scope.resolve();
        if (parent instanceof AST_VarDef) return parent.value === node;
    }