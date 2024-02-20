function getImportDeclarationInsertionIndex(sortedImports, newImport, comparer) {
            const index = binarySearch(sortedImports, newImport, identity, (a, b) => compareImportsOrRequireStatements(a, b, comparer));
            return index < 0 ? ~index : index;
        }