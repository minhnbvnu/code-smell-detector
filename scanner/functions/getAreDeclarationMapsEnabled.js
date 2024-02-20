function getAreDeclarationMapsEnabled(options) {
            return !!(getEmitDeclarations(options) && options.declarationMap);
        }