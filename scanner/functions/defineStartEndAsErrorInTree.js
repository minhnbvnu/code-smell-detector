function defineStartEndAsErrorInTree(ast, visitorKeys) {
        Traverser.traverse(ast, { visitorKeys, enter: defineStartEndAsError.bind(null, "node") });
        ast.tokens.forEach(defineStartEndAsError.bind(null, "token"));
        ast.comments.forEach(defineStartEndAsError.bind(null, "token"));
    }