function getTargetOfAliasLikeExpression(expression, dontResolveAlias) {
                if (isClassExpression(expression)) {
                    return checkExpressionCached(expression).symbol;
                }
                if (!isEntityName(expression) && !isEntityNameExpression(expression)) {
                    return void 0;
                }
                const aliasLike = resolveEntityName(expression, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */, 
                /*ignoreErrors*/
                true, dontResolveAlias);
                if (aliasLike) {
                    return aliasLike;
                }
                checkExpressionCached(expression);
                return getNodeLinks(expression).resolvedSymbol;
            }