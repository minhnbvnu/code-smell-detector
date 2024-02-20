function doAddExistingFix(changes, sourceFile, clause, defaultImport, namedImports, compilerOptions, preferences) {
            var _a2;
            if (clause.kind === 203 /* ObjectBindingPattern */) {
                if (defaultImport) {
                    addElementToBindingPattern(clause, defaultImport.name, "default");
                }
                for (const specifier of namedImports) {
                    addElementToBindingPattern(clause, specifier.name, 
                    /*propertyName*/
                    void 0);
                }
                return;
            }
            const promoteFromTypeOnly2 = clause.isTypeOnly && some([defaultImport, ...namedImports], (i) => (i == null ? void 0 : i.addAsTypeOnly) === 4 /* NotAllowed */);
            const existingSpecifiers = clause.namedBindings && ((_a2 = tryCast(clause.namedBindings, isNamedImports)) == null ? void 0 : _a2.elements);
            const convertExistingToTypeOnly = promoteFromTypeOnly2 && importNameElisionDisabled(compilerOptions);
            if (defaultImport) {
                Debug.assert(!clause.name, "Cannot add a default import to an import clause that already has one");
                changes.insertNodeAt(sourceFile, clause.getStart(sourceFile), factory.createIdentifier(defaultImport.name), { suffix: ", " });
            }
            if (namedImports.length) {
                let ignoreCaseForSorting;
                if (typeof preferences.organizeImportsIgnoreCase === "boolean") {
                    ignoreCaseForSorting = preferences.organizeImportsIgnoreCase;
                }
                else if (existingSpecifiers) {
                    const targetImportSorting = ts_OrganizeImports_exports.detectImportSpecifierSorting(existingSpecifiers, preferences);
                    if (targetImportSorting !== 3 /* Both */) {
                        ignoreCaseForSorting = targetImportSorting === 2 /* CaseInsensitive */;
                    }
                }
                if (ignoreCaseForSorting === void 0) {
                    ignoreCaseForSorting = ts_OrganizeImports_exports.detectSorting(sourceFile, preferences) === 2 /* CaseInsensitive */;
                }
                const comparer = ts_OrganizeImports_exports.getOrganizeImportsComparer(preferences, ignoreCaseForSorting);
                const newSpecifiers = stableSort(namedImports.map((namedImport) => factory.createImportSpecifier((!clause.isTypeOnly || promoteFromTypeOnly2) && needsTypeOnly(namedImport), 
                /*propertyName*/
                void 0, factory.createIdentifier(namedImport.name))), (s1, s2) => ts_OrganizeImports_exports.compareImportOrExportSpecifiers(s1, s2, comparer));
                const specifierSort = (existingSpecifiers == null ? void 0 : existingSpecifiers.length) && ts_OrganizeImports_exports.detectImportSpecifierSorting(existingSpecifiers, preferences);
                if (specifierSort && !(ignoreCaseForSorting && specifierSort === 1 /* CaseSensitive */)) {
                    for (const spec of newSpecifiers) {
                        const insertionIndex = convertExistingToTypeOnly && !spec.isTypeOnly ? 0 : ts_OrganizeImports_exports.getImportSpecifierInsertionIndex(existingSpecifiers, spec, comparer);
                        changes.insertImportSpecifierAtIndex(sourceFile, spec, clause.namedBindings, insertionIndex);
                    }
                }
                else if (existingSpecifiers == null ? void 0 : existingSpecifiers.length) {
                    for (const spec of newSpecifiers) {
                        changes.insertNodeInListAfter(sourceFile, last(existingSpecifiers), spec, existingSpecifiers);
                    }
                }
                else {
                    if (newSpecifiers.length) {
                        const namedImports2 = factory.createNamedImports(newSpecifiers);
                        if (clause.namedBindings) {
                            changes.replaceNode(sourceFile, clause.namedBindings, namedImports2);
                        }
                        else {
                            changes.insertNodeAfter(sourceFile, Debug.checkDefined(clause.name, "Import clause must have either named imports or a default import"), namedImports2);
                        }
                    }
                }
            }
            if (promoteFromTypeOnly2) {
                changes.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(clause, sourceFile));
                if (convertExistingToTypeOnly && existingSpecifiers) {
                    for (const specifier of existingSpecifiers) {
                        changes.insertModifierBefore(sourceFile, 154 /* TypeKeyword */, specifier);
                    }
                }
            }
            function addElementToBindingPattern(bindingPattern, name, propertyName) {
                const element = factory.createBindingElement(
                /*dotDotDotToken*/
                void 0, propertyName, name);
                if (bindingPattern.elements.length) {
                    changes.insertNodeInListAfter(sourceFile, last(bindingPattern.elements), element);
                }
                else {
                    changes.replaceNode(sourceFile, bindingPattern, factory.createObjectBindingPattern([element]));
                }
            }
        }