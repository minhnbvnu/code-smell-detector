function deleteItems(ids) {
            if (ids.length === 0) {
                return;
            }
            if (isBulkSuspend) {
                for (var i = 0, l = ids.length; i < l; i++) {
                    var id = ids[i];
                    var idx = idxById.get(id);
                    if (idx === undefined) {
                        throw new Error("[SlickGrid DataView] Invalid id");
                    }
                    bulkDeleteIds.set(id, true);
                }
            }
            else {
                // collect all indexes
                var indexesToDelete = [];
                for (var i = 0, l = ids.length; i < l; i++) {
                    var id = ids[i];
                    var idx = idxById.get(id);
                    if (idx === undefined) {
                        throw new Error("[SlickGrid DataView] Invalid id");
                    }
                    idxById.delete(id);
                    indexesToDelete.push(idx);
                }
                // Remove from back to front
                indexesToDelete.sort();
                for (var i = indexesToDelete.length - 1; i >= 0; --i) {
                    items.splice(indexesToDelete[i], 1);
                }
                // update lookup from front to back
                updateIdxById(indexesToDelete[0]);
                refresh();
            }
        }