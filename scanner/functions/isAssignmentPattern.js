function isAssignmentPattern(node) {
            const kind = node.kind;
            return kind === 206 /* ArrayLiteralExpression */ || kind === 207 /* ObjectLiteralExpression */;
        }