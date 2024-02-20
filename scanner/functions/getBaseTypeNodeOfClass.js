function getBaseTypeNodeOfClass(type) {
                const decl = getClassLikeDeclarationOfSymbol(type.symbol);
                return decl && getEffectiveBaseTypeNode(decl);
            }