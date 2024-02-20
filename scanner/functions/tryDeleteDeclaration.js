function tryDeleteDeclaration(sourceFile, token, changes, checker, sourceFiles, program, cancellationToken, isFixAll) {
            tryDeleteDeclarationWorker(token, changes, sourceFile, checker, sourceFiles, program, cancellationToken, isFixAll);
            if (isIdentifier(token)) {
                ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(token, checker, sourceFile, (ref) => {
                    if (isPropertyAccessExpression(ref.parent) && ref.parent.name === ref)
                        ref = ref.parent;
                    if (!isFixAll && mayDeleteExpression(ref)) {
                        changes.delete(sourceFile, ref.parent.parent);
                    }
                });
            }
        }