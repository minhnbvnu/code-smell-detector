function isObjectLiteralOrClassExpressionMethodOrAccessor(node) {
            return (node.kind === 171 /* MethodDeclaration */ || node.kind === 174 /* GetAccessor */ || node.kind === 175 /* SetAccessor */) && (node.parent.kind === 207 /* ObjectLiteralExpression */ || node.parent.kind === 228 /* ClassExpression */);
        }