function isShorthandAmbientModuleSymbol(moduleSymbol) {
            return isShorthandAmbientModule(moduleSymbol.valueDeclaration);
        }