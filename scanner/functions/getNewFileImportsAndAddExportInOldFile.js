function getNewFileImportsAndAddExportInOldFile(oldFile, importsToCopy, newFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference) {
            const copiedOldImports = [];
            for (const oldStatement of oldFile.statements) {
                forEachImportInStatement(oldStatement, (i) => {
                    append(copiedOldImports, filterImport(i, moduleSpecifierFromImport(i), (name) => importsToCopy.has(checker.getSymbolAtLocation(name))));
                });
            }
            let oldFileDefault;
            const oldFileNamedImports = [];
            const markSeenTop = nodeSeenTracker();
            newFileImportsFromOldFile.forEach((symbol) => {
                if (!symbol.declarations) {
                    return;
                }
                for (const decl of symbol.declarations) {
                    if (!isTopLevelDeclaration(decl))
                        continue;
                    const name = nameOfTopLevelDeclaration(decl);
                    if (!name)
                        continue;
                    const top = getTopLevelDeclarationStatement(decl);
                    if (markSeenTop(top)) {
                        addExportToChanges(oldFile, top, name, changes, useEsModuleSyntax);
                    }
                    if (hasSyntacticModifier(decl, 1024 /* Default */)) {
                        oldFileDefault = name;
                    }
                    else {
                        oldFileNamedImports.push(name.text);
                    }
                }
            });
            append(copiedOldImports, makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, getBaseFileName(oldFile.fileName), program, host, useEsModuleSyntax, quotePreference));
            return copiedOldImports;
        }