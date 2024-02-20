function compareNavigateToItems(i1, i2) {
            return compareValues(i1.matchKind, i2.matchKind) || compareStringsCaseSensitiveUI(i1.name, i2.name);
        }