function doNamespaceImportChange(changes, sourceFile, importDeclaration, program) {
            ts_refactor_exports.doChangeNamedToNamespaceOrDefault(sourceFile, program, changes, importDeclaration.parent);
        }