function wouldRenameInOtherNodeModules(originalFile, symbol, checker, preferences) {
            if (!preferences.providePrefixAndSuffixTextForRename && symbol.flags & 2097152 /* Alias */) {
                const importSpecifier = symbol.declarations && find(symbol.declarations, (decl) => isImportSpecifier(decl));
                if (importSpecifier && !importSpecifier.propertyName) {
                    symbol = checker.getAliasedSymbol(symbol);
                }
            }
            const { declarations } = symbol;
            if (!declarations) {
                return void 0;
            }
            const originalPackage = getPackagePathComponents(originalFile.path);
            if (originalPackage === void 0) {
                if (some(declarations, (declaration) => isInsideNodeModules(declaration.getSourceFile().path))) {
                    return Diagnostics.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder;
                }
                else {
                    return void 0;
                }
            }
            for (const declaration of declarations) {
                const declPackage = getPackagePathComponents(declaration.getSourceFile().path);
                if (declPackage) {
                    const length2 = Math.min(originalPackage.length, declPackage.length);
                    for (let i = 0; i <= length2; i++) {
                        if (compareStringsCaseSensitive(originalPackage[i], declPackage[i]) !== 0 /* EqualTo */) {
                            return Diagnostics.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder;
                        }
                    }
                }
            }
            return void 0;
        }