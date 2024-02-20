function isCommaExpression(node) {
            return node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 27 /* CommaToken */;
        }