function getNormalizedSymbolModifiers(symbol) {
            if (symbol.declarations && symbol.declarations.length) {
                const [declaration, ...declarations] = symbol.declarations;
                const excludeFlags = length(declarations) && isDeprecatedDeclaration(declaration) && some(declarations, (d) => !isDeprecatedDeclaration(d)) ? 8192 /* Deprecated */ : 0 /* None */;
                const modifiers = getNodeModifiers(declaration, excludeFlags);
                if (modifiers) {
                    return modifiers.split(",");
                }
            }
            return [];
        }