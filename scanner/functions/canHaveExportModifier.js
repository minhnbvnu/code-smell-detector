function canHaveExportModifier(node) {
            return isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node) || isInterfaceDeclaration(node) || isTypeDeclaration(node) || isModuleDeclaration(node) && !isExternalModuleAugmentation(node) && !isGlobalScopeAugmentation(node);
        }