function canBecomeVariableDeclaration(identifier) {
        let node = identifier.parent;
        while (PATTERN_TYPE.test(node.type)) {
            node = node.parent;
        }
        return (node.type === "VariableDeclarator" ||
            (node.type === "AssignmentExpression" &&
                node.parent.type === "ExpressionStatement" &&
                DECLARATION_HOST_TYPE.test(node.parent.parent.type)));
    }