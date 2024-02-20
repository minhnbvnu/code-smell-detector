function hasNonGlobalAugmentationExternalModuleSymbol(declaration) {
                return isModuleWithStringLiteralName(declaration) || declaration.kind === 308 /* SourceFile */ && isExternalOrCommonJsModule(declaration);
            }