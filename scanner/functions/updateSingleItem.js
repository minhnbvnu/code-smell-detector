function updateSingleItem(id, item) {
            // see also https://github.com/mleibman/SlickGrid/issues/1082
            if (!idxById.has(id)) {
                throw new Error("[SlickGrid DataView] Invalid id");
            }
            // What if the specified item also has an updated idProperty?
            // Then we'll have to update the index as well, and possibly the `updated` cache too.
            if (id !== item[idProperty]) {
                // make sure the new id is unique:
                var newId = item[idProperty];
                if (newId == null) {
                    throw new Error("[SlickGrid DataView] Cannot update item to associate with a null id");
                }
                if (idxById.has(newId)) {
                    throw new Error("[SlickGrid DataView] Cannot update item to associate with a non-unique id");
                }
                idxById.set(newId, idxById.get(id));
                idxById.delete(id);
                // Also update the `updated` hashtable/markercache? Yes, `recalc()` inside `refresh()` needs that one!
                if (updated && updated[id]) {
                    delete updated[id];
                }
                // Also update the row indexes? no need since the `refresh()`, further down, blows away the `rowsById[]` cache!
                id = newId;
            }
            items[idxById.get(id)] = item;
            // Also update the rows? no need since the `refresh()`, further down, blows away the `rows[]` cache and recalculates it via `recalc()`!
            if (!updated) {
                updated = {};
            }
            updated[id] = true;
        }