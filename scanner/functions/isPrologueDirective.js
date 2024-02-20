function isPrologueDirective(node) {
            return node.kind === 241 /* ExpressionStatement */ && node.expression.kind === 10 /* StringLiteral */;
        }