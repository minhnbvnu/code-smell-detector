function isClassLike(node) {
            return node && (node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */);
        }