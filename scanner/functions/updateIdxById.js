function updateIdxById(startingIndex) {
            if (isBulkSuspend) { // during bulk update we do not reorganize
                return;
            }
            startingIndex = startingIndex || 0;
            var id;
            for (var i = startingIndex, l = items.length; i < l; i++) {
                id = items[i][idProperty];
                if (id === undefined) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
                idxById.set(id, i);
            }
        }