function getImplementationAtPosition(fileName, position) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.getImplementationsAtPosition(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
            }