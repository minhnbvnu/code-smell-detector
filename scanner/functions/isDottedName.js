function isDottedName(node) {
            return node.kind === 79 /* Identifier */ || node.kind === 108 /* ThisKeyword */ || node.kind === 106 /* SuperKeyword */ || node.kind === 233 /* MetaProperty */ || node.kind === 208 /* PropertyAccessExpression */ && isDottedName(node.expression) || node.kind === 214 /* ParenthesizedExpression */ && isDottedName(node.expression);
        }