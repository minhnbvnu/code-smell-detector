function getExternalModuleContainer(declaration) {
                const node = findAncestor(declaration, hasExternalModuleSymbol);
                return node && getSymbolOfDeclaration(node);
            }