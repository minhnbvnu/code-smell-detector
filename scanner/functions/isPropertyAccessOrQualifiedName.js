function isPropertyAccessOrQualifiedName(node) {
            const kind = node.kind;
            return kind === 208 /* PropertyAccessExpression */ || kind === 163 /* QualifiedName */;
        }