function ensureIdUniqueness() {
            if (isBulkSuspend) { // during bulk update we do not reorganize
                return;
            }
            var id;
            for (var i = 0, l = items.length; i < l; i++) {
                id = items[i][idProperty];
                if (id === undefined || idxById.get(id) !== i) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
            }
        }