function deleteUnusedOldImports(oldFile, toMove, changes, toDelete, checker) {
            for (const statement of oldFile.statements) {
                if (contains(toMove, statement))
                    continue;
                forEachImportInStatement(statement, (i) => deleteUnusedImports(oldFile, i, changes, (name) => toDelete.has(checker.getSymbolAtLocation(name))));
            }
        }