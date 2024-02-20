function hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier) {
            const moduleSpecifierText = isStringLiteral(moduleSpecifier) && moduleSpecifier.text;
            return isString(moduleSpecifierText) && some(sourceFile.moduleAugmentations, (moduleName) => isStringLiteral(moduleName) && moduleName.text === moduleSpecifierText);
        }