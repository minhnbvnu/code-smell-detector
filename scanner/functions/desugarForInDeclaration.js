function desugarForInDeclaration(node) {
    if (node.varDecl) {
        // for (var P in E) B
        // for (var P = E1 in E2) B

        // INVARIANT: typeof decl.name === "string" ==> decl === node.iterator
        // INVARIANT: typeof decl.name === "object" ==> decl.name === node.iterator.exp

        var decl = node.varDecl.children[0];

        // FIXME: do this in desugarStatement?
        if (decl.initializer)
            decl.initializer = desugarExpression(decl.initializer);

        if (typeof decl.name !== "string") {
            var patt = decl.name;
            var tmp = generateTemp(patt);
            decl.value = decl.name = tmp.value;
            // FIXME: or generate an ASSIGN node if it's an assignment
            node.iterator = tmp;
            node.body = insertIntoBody(patt, tmp, node.body);
        }
    } else if (node.iterator.type === ASSIGN) {
        // for (P = E1 in E2) B
        var lhs = node.iterator.children[0];

        if (lhs.type !== IDENTIFIER) {
            var tmp = generateTemp(lhs);
            node.iterator.children[0] = tmp;
            node.body = insertIntoBody(lhs, tmp, node.body);
        }
        node.iterator.children[1] = desugarExpression(node.iterator.children[1]);
    } else {
        // for (P in E) B
        if (node.iterator.type !== IDENTIFIER) {
            var tmp = generateTemp(node);
            var patt = node.iterator;
            node.iterator = tmp;
            node.body = insertIntoBody(patt, tmp, node.body);
        }
    }

    // FIXME: do these in desugarStatement?
    node.object = desugarExpression(node.object);
    desugarStatement(node.body);
}