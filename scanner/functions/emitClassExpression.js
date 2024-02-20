function emitClassExpression(node) {
                generateNameIfNeeded(node.name);
                emitClassDeclarationOrExpression(node);
            }