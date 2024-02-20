function isJsxTagNameExpression(node) {
            const kind = node.kind;
            return kind === 108 /* ThisKeyword */ || kind === 79 /* Identifier */ || kind === 208 /* PropertyAccessExpression */;
        }