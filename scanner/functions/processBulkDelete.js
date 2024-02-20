function processBulkDelete() {
            // the bulk update is processed by
            // recomputing the whole items array and the index lookup in one go.
            // this is done by placing the not-deleted items
            // from left to right into the array and shrink the array the the new
            // size afterwards.
            // see https://github.com/6pac/SlickGrid/issues/571 for further details.
            var id, item, newIdx = 0;
            for (var i = 0, l = items.length; i < l; i++) {
                item = items[i];
                id = item[idProperty];
                if (id === undefined) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
                // if items have been marked as deleted we skip them for the new final items array
                // and we remove them from the lookup table.
                if (bulkDeleteIds.has(id)) {
                    idxById.delete(id);
                }
                else {
                    // for items which are not deleted, we add them to the
                    // next free position in the array and register the index in the lookup.
                    items[newIdx] = item;
                    idxById.set(id, newIdx);
                    ++newIdx;
                }
            }
            // here we shrink down the full item array to the ones actually
            // inserted in the cleanup loop above.
            items.length = newIdx;
            // and finally cleanup the deleted ids to start cleanly on the next update.
            bulkDeleteIds = new Slick.Map();
        }