function handleNamespaceImport(importDeclaration, name, isReExport, alreadyAddedDirect) {
                if (exportKind === 2 /* ExportEquals */) {
                    if (!alreadyAddedDirect)
                        directImports.push(importDeclaration);
                }
                else if (!isAvailableThroughGlobal) {
                    const sourceFileLike = getSourceFileLikeForImportDeclaration(importDeclaration);
                    Debug.assert(sourceFileLike.kind === 308 /* SourceFile */ || sourceFileLike.kind === 264 /* ModuleDeclaration */);
                    if (isReExport || findNamespaceReExports(sourceFileLike, name, checker)) {
                        addIndirectUser(sourceFileLike, 
                        /** addTransitiveDependencies */
                        true);
                    }
                    else {
                        addIndirectUser(sourceFileLike);
                    }
                }
            }