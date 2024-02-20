function getImportSpecifierInsertionIndex(sortedImports, newImport, comparer) {
            const index = binarySearch(sortedImports, newImport, identity, (s1, s2) => compareImportOrExportSpecifiers(s1, s2, comparer));
            return index < 0 ? ~index : index;
        }