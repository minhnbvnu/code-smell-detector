function bindObjectLiteralExpression(node) {
                return bindAnonymousDeclaration(node, 4096 /* ObjectLiteral */, "__object" /* Object */);
            }