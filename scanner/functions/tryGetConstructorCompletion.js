function tryGetConstructorCompletion() {
                if (!tryGetConstructorLikeCompletionContainer(contextToken))
                    return 0 /* Continue */;
                completionKind = 5 /* None */;
                isNewIdentifierLocation = true;
                keywordFilters = 4 /* ConstructorParameterKeywords */;
                return 1 /* Success */;
            }