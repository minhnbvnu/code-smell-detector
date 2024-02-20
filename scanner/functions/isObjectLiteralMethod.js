function isObjectLiteralMethod(node) {
            return node && node.kind === 171 /* MethodDeclaration */ && node.parent.kind === 207 /* ObjectLiteralExpression */;
        }