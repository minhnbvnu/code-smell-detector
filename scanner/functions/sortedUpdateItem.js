function sortedUpdateItem(id, item) {
            if (!idxById.has(id) || id !== item[idProperty]) {
                throw new Error("[SlickGrid DataView] Invalid or non-matching id " + idxById.get(id));
            }
            if (!sortComparer) {
                throw new Error("[SlickGrid DataView] sortedUpdateItem() requires a sort comparer, use sort()");
            }
            var oldItem = getItemById(id);
            if (sortComparer(oldItem, item) !== 0) {
                // item affects sorting -> must use sorted add
                deleteItem(id);
                sortedAddItem(item);
            }
            else { // update does not affect sorting -> regular update works fine
                updateItem(id, item);
            }
        }