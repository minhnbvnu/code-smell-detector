function tryGetObjectLikeCompletionContainer(contextToken) {
            if (contextToken) {
                const { parent: parent2 } = contextToken;
                switch (contextToken.kind) {
                    case 18 /* OpenBraceToken */:
                    case 27 /* CommaToken */:
                        if (isObjectLiteralExpression(parent2) || isObjectBindingPattern(parent2)) {
                            return parent2;
                        }
                        break;
                    case 41 /* AsteriskToken */:
                        return isMethodDeclaration(parent2) ? tryCast(parent2.parent, isObjectLiteralExpression) : void 0;
                    case 79 /* Identifier */:
                        return contextToken.text === "async" && isShorthandPropertyAssignment(contextToken.parent) ? contextToken.parent.parent : void 0;
                }
            }
            return void 0;
        }