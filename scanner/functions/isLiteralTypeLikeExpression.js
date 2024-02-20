function isLiteralTypeLikeExpression(node) {
            const kind = node.kind;
            return kind === 104 /* NullKeyword */ || kind === 110 /* TrueKeyword */ || kind === 95 /* FalseKeyword */ || isLiteralExpression(node) || isPrefixUnaryExpression(node);
        }