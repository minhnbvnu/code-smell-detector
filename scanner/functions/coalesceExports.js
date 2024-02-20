function coalesceExports(exportGroup, ignoreCase) {
            const comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase);
            return coalesceExportsWorker(exportGroup, comparer);
        }