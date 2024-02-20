function isFunctionReferencedInFile(sourceFile, typeChecker, node) {
            return !!node.name && ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(node.name, typeChecker, sourceFile);
        }