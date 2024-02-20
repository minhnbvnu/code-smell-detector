function hasValueSideModule(symbol) {
            return some(symbol.declarations, (declaration) => isModuleDeclaration(declaration) && getModuleInstanceState(declaration) === 1 /* Instantiated */);
        }