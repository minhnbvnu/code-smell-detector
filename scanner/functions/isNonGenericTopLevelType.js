function isNonGenericTopLevelType(type) {
                if (type.aliasSymbol && !type.aliasTypeArguments) {
                    const declaration = getDeclarationOfKind(type.aliasSymbol, 262 /* TypeAliasDeclaration */);
                    return !!(declaration && findAncestor(declaration.parent, (n) => n.kind === 308 /* SourceFile */ ? true : n.kind === 264 /* ModuleDeclaration */ ? false : "quit"));
                }
                return false;
            }