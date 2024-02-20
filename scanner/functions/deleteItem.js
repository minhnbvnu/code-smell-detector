function deleteItem(id) {
            if (isBulkSuspend) {
                bulkDeleteIds.set(id, true);
            }
            else {
                var idx = idxById.get(id);
                if (idx === undefined) {
                    throw new Error("[SlickGrid DataView] Invalid id");
                }
                idxById.delete(id);
                items.splice(idx, 1);
                updateIdxById(idx);
                refresh();
            }
        }