function addIndirectUser(sourceFileLike, addTransitiveDependencies = false) {
                Debug.assert(!isAvailableThroughGlobal);
                const isNew = markSeenIndirectUser(sourceFileLike);
                if (!isNew)
                    return;
                indirectUserDeclarations.push(sourceFileLike);
                if (!addTransitiveDependencies)
                    return;
                const moduleSymbol = checker.getMergedSymbol(sourceFileLike.symbol);
                if (!moduleSymbol)
                    return;
                Debug.assert(!!(moduleSymbol.flags & 1536 /* Module */));
                const directImports2 = getDirectImports(moduleSymbol);
                if (directImports2) {
                    for (const directImport of directImports2) {
                        if (!isImportTypeNode(directImport)) {
                            addIndirectUser(getSourceFileLikeForImportDeclaration(directImport), 
                            /** addTransitiveDependencies */
                            true);
                        }
                    }
                }
            }