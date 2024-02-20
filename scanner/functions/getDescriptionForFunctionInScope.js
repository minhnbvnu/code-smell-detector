function getDescriptionForFunctionInScope(scope) {
            return isFunctionLikeDeclaration(scope) ? "inner function" : isClassLike(scope) ? "method" : "function";
        }