function tryDeleteDeclarationWorker(token, changes, sourceFile, checker, sourceFiles, program, cancellationToken, isFixAll) {
            const { parent: parent2 } = token;
            if (isParameter(parent2)) {
                tryDeleteParameter(changes, sourceFile, parent2, checker, sourceFiles, program, cancellationToken, isFixAll);
            }
            else if (!(isFixAll && isIdentifier(token) && ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(token, checker, sourceFile))) {
                const node = isImportClause(parent2) ? token : isComputedPropertyName(parent2) ? parent2.parent : parent2;
                Debug.assert(node !== sourceFile, "should not delete whole source file");
                changes.delete(sourceFile, node);
            }
        }