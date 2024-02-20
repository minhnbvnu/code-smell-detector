function removeBlockBodyBrace(changes, sourceFile, declaration, expression, commentSource, withParen) {
            const newBody = withParen || needsParentheses(expression) ? factory.createParenthesizedExpression(expression) : expression;
            suppressLeadingAndTrailingTrivia(commentSource);
            copyComments(commentSource, newBody);
            changes.replaceNode(sourceFile, declaration.body, newBody);
        }