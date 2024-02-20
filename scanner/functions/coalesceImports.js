function coalesceImports(importGroup, ignoreCase, sourceFile) {
            const comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase);
            return coalesceImportsWorker(importGroup, comparer, sourceFile);
        }