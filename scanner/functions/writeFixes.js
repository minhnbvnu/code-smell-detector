function writeFixes(changeTracker) {
                const quotePreference = getQuotePreference(sourceFile, preferences);
                for (const fix of addToNamespace) {
                    addNamespaceQualifier(changeTracker, sourceFile, fix);
                }
                for (const fix of importType) {
                    addImportType(changeTracker, sourceFile, fix, quotePreference);
                }
                addToExisting.forEach(({ importClauseOrBindingPattern, defaultImport, namedImports }) => {
                    doAddExistingFix(changeTracker, sourceFile, importClauseOrBindingPattern, defaultImport, arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })), compilerOptions, preferences);
                });
                let newDeclarations;
                newImports.forEach(({ useRequire, defaultImport, namedImports, namespaceLikeImport }, key) => {
                    const moduleSpecifier = key.slice(2);
                    const getDeclarations = useRequire ? getNewRequires : getNewImports;
                    const declarations = getDeclarations(moduleSpecifier, quotePreference, defaultImport, namedImports && arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })), namespaceLikeImport, compilerOptions);
                    newDeclarations = combine(newDeclarations, declarations);
                });
                if (newDeclarations) {
                    insertImports(changeTracker, sourceFile, newDeclarations, 
                    /*blankLineBetween*/
                    true, preferences);
                }
            }