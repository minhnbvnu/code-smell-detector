function insertImports(changes, sourceFile, imports, blankLineBetween, preferences) {
            const decl = isArray(imports) ? imports[0] : imports;
            const importKindPredicate = decl.kind === 240 /* VariableStatement */ ? isRequireVariableStatement : isAnyImportSyntax;
            const existingImportStatements = filter(sourceFile.statements, importKindPredicate);
            let sortKind = isArray(imports) ? ts_OrganizeImports_exports.detectImportDeclarationSorting(imports, preferences) : 3 /* Both */;
            const comparer = ts_OrganizeImports_exports.getOrganizeImportsComparer(preferences, sortKind === 2 /* CaseInsensitive */);
            const sortedNewImports = isArray(imports) ? stableSort(imports, (a, b) => ts_OrganizeImports_exports.compareImportsOrRequireStatements(a, b, comparer)) : [imports];
            if (!existingImportStatements.length) {
                changes.insertNodesAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween);
            }
            else if (existingImportStatements && (sortKind = ts_OrganizeImports_exports.detectImportDeclarationSorting(existingImportStatements, preferences))) {
                const comparer2 = ts_OrganizeImports_exports.getOrganizeImportsComparer(preferences, sortKind === 2 /* CaseInsensitive */);
                for (const newImport of sortedNewImports) {
                    const insertionIndex = ts_OrganizeImports_exports.getImportDeclarationInsertionIndex(existingImportStatements, newImport, comparer2);
                    if (insertionIndex === 0) {
                        const options = existingImportStatements[0] === sourceFile.statements[0] ? { leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude } : {};
                        changes.insertNodeBefore(sourceFile, existingImportStatements[0], newImport, 
                        /*blankLineBetween*/
                        false, options);
                    }
                    else {
                        const prevImport = existingImportStatements[insertionIndex - 1];
                        changes.insertNodeAfter(sourceFile, prevImport, newImport);
                    }
                }
            }
            else {
                const lastExistingImport = lastOrUndefined(existingImportStatements);
                if (lastExistingImport) {
                    changes.insertNodesAfter(sourceFile, lastExistingImport, sortedNewImports);
                }
                else {
                    changes.insertNodesAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween);
                }
            }
        }