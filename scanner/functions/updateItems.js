function updateItems(ids, newItems) {
            if (ids.length !== newItems.length) {
                throw new Error("[SlickGrid DataView] Mismatch on the length of ids and items provided to update");
            }
            for (var i = 0, l = newItems.length; i < l; i++) {
                updateSingleItem(ids[i], newItems[i]);
            }
            refresh();
        }