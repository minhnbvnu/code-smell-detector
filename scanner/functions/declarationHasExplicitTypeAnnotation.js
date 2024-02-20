function declarationHasExplicitTypeAnnotation(node) {
        if (ts.isJSDocPropertyLikeTag(node))
            return node.typeExpression !== undefined;
        return (node_1.isVariableDeclaration(node) ||
            node_1.isParameterDeclaration(node) ||
            node_1.isPropertyDeclaration(node) ||
            node_1.isPropertySignature(node)) && (util_1.isNodeFlagSet(node, ts.NodeFlags.JavaScriptFile)
            ? ts.getJSDocType(node)
            : node.type) !== undefined;
    }