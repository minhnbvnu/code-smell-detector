function updateImportsInOtherFiles(changes, program, host, oldFile, movedSymbols, newFilename) {
            const checker = program.getTypeChecker();
            for (const sourceFile of program.getSourceFiles()) {
                if (sourceFile === oldFile)
                    continue;
                for (const statement of sourceFile.statements) {
                    forEachImportInStatement(statement, (importNode) => {
                        if (checker.getSymbolAtLocation(moduleSpecifierFromImport(importNode)) !== oldFile.symbol)
                            return;
                        const shouldMove = (name) => {
                            const symbol = isBindingElement(name.parent) ? getPropertySymbolFromBindingElement(checker, name.parent) : skipAlias(checker.getSymbolAtLocation(name), checker);
                            return !!symbol && movedSymbols.has(symbol);
                        };
                        deleteUnusedImports(sourceFile, importNode, changes, shouldMove);
                        const pathToNewFileWithExtension = resolvePath(getDirectoryPath(oldFile.path), newFilename);
                        const newModuleSpecifier = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.path, pathToNewFileWithExtension, createModuleSpecifierResolutionHost(program, host));
                        const newImportDeclaration = filterImport(importNode, factory.createStringLiteral(newModuleSpecifier), shouldMove);
                        if (newImportDeclaration)
                            changes.insertNodeAfter(sourceFile, statement, newImportDeclaration);
                        const ns = getNamespaceLikeImport(importNode);
                        if (ns)
                            updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleSpecifier, ns, importNode);
                    });
                }
            }
        }