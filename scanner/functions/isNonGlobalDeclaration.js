function isNonGlobalDeclaration(declaration) {
            const sourceFile = declaration.getSourceFile();
            if (!sourceFile.externalModuleIndicator && !sourceFile.commonJsModuleIndicator) {
                return false;
            }
            return isInJSFile(declaration) || !findAncestor(declaration, (d) => isModuleDeclaration(d) && isGlobalScopeAugmentation(d));
        }