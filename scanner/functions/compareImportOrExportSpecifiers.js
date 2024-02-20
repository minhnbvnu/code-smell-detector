function compareImportOrExportSpecifiers(s1, s2, comparer) {
            return compareBooleans(s1.isTypeOnly, s2.isTypeOnly) || comparer(s1.name.text, s2.name.text);
        }