function emitFunctionExpression(node) {
                generateNameIfNeeded(node.name);
                emitFunctionDeclarationOrExpression(node);
            }