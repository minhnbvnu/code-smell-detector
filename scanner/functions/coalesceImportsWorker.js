function coalesceImportsWorker(importGroup, comparer, sourceFile) {
            if (importGroup.length === 0) {
                return importGroup;
            }
            const { importWithoutClause, typeOnlyImports, regularImports } = getCategorizedImports(importGroup);
            const coalescedImports = [];
            if (importWithoutClause) {
                coalescedImports.push(importWithoutClause);
            }
            for (const group2 of [regularImports, typeOnlyImports]) {
                const isTypeOnly = group2 === typeOnlyImports;
                const { defaultImports, namespaceImports, namedImports } = group2;
                if (!isTypeOnly && defaultImports.length === 1 && namespaceImports.length === 1 && namedImports.length === 0) {
                    const defaultImport = defaultImports[0];
                    coalescedImports.push(updateImportDeclarationAndClause(defaultImport, defaultImport.importClause.name, namespaceImports[0].importClause.namedBindings));
                    continue;
                }
                const sortedNamespaceImports = stableSort(namespaceImports, (i1, i2) => comparer(i1.importClause.namedBindings.name.text, i2.importClause.namedBindings.name.text));
                for (const namespaceImport of sortedNamespaceImports) {
                    coalescedImports.push(updateImportDeclarationAndClause(namespaceImport, 
                    /*name*/
                    void 0, namespaceImport.importClause.namedBindings));
                }
                const firstDefaultImport = firstOrUndefined(defaultImports);
                const firstNamedImport = firstOrUndefined(namedImports);
                const importDecl = firstDefaultImport != null ? firstDefaultImport : firstNamedImport;
                if (!importDecl) {
                    continue;
                }
                let newDefaultImport;
                const newImportSpecifiers = [];
                if (defaultImports.length === 1) {
                    newDefaultImport = defaultImports[0].importClause.name;
                }
                else {
                    for (const defaultImport of defaultImports) {
                        newImportSpecifiers.push(factory.createImportSpecifier(
                        /*isTypeOnly*/
                        false, factory.createIdentifier("default"), defaultImport.importClause.name));
                    }
                }
                newImportSpecifiers.push(...getNewImportSpecifiers(namedImports));
                const sortedImportSpecifiers = factory.createNodeArray(sortSpecifiers(newImportSpecifiers, comparer), firstNamedImport == null ? void 0 : firstNamedImport.importClause.namedBindings.elements.hasTrailingComma);
                const newNamedImports = sortedImportSpecifiers.length === 0 ? newDefaultImport ? void 0 : factory.createNamedImports(emptyArray) : firstNamedImport ? factory.updateNamedImports(firstNamedImport.importClause.namedBindings, sortedImportSpecifiers) : factory.createNamedImports(sortedImportSpecifiers);
                if (sourceFile && newNamedImports && (firstNamedImport == null ? void 0 : firstNamedImport.importClause.namedBindings) && !rangeIsOnSingleLine(firstNamedImport.importClause.namedBindings, sourceFile)) {
                    setEmitFlags(newNamedImports, 2 /* MultiLine */);
                }
                if (isTypeOnly && newDefaultImport && newNamedImports) {
                    coalescedImports.push(updateImportDeclarationAndClause(importDecl, newDefaultImport, 
                    /*namedBindings*/
                    void 0));
                    coalescedImports.push(updateImportDeclarationAndClause(firstNamedImport != null ? firstNamedImport : importDecl, 
                    /*name*/
                    void 0, newNamedImports));
                }
                else {
                    coalescedImports.push(updateImportDeclarationAndClause(importDecl, newDefaultImport, newNamedImports));
                }
            }
            return coalescedImports;
        }