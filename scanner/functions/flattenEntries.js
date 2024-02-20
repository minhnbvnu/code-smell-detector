function flattenEntries(referenceSymbols) {
            return referenceSymbols && flatMap(referenceSymbols, (r) => r.references);
        }