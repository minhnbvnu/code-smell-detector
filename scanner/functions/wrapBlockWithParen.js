function wrapBlockWithParen(changes, sourceFile, declaration, expression) {
            changes.replaceNode(sourceFile, declaration.body, factory.createParenthesizedExpression(expression));
        }