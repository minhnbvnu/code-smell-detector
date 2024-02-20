function isDeprecated(symbol, checker) {
            const declarations = skipAlias(symbol, checker).declarations;
            return !!length(declarations) && every(declarations, isDeprecatedDeclaration);
        }