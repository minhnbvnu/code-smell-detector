function sortSpecifiers(specifiers, comparer) {
            return stableSort(specifiers, (s1, s2) => compareImportOrExportSpecifiers(s1, s2, comparer));
        }