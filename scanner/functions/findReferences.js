function findReferences(fileName, position) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.findReferencedSymbols(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
            }