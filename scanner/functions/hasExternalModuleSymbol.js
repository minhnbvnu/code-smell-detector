function hasExternalModuleSymbol(declaration) {
                return isAmbientModule(declaration) || declaration.kind === 308 /* SourceFile */ && isExternalOrCommonJsModule(declaration);
            }