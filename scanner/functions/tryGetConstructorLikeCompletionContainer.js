function tryGetConstructorLikeCompletionContainer(contextToken2) {
                if (contextToken2) {
                    const parent2 = contextToken2.parent;
                    switch (contextToken2.kind) {
                        case 20 /* OpenParenToken */:
                        case 27 /* CommaToken */:
                            return isConstructorDeclaration(contextToken2.parent) ? contextToken2.parent : void 0;
                        default:
                            if (isConstructorParameterCompletion(contextToken2)) {
                                return parent2.parent;
                            }
                    }
                }
                return void 0;
            }