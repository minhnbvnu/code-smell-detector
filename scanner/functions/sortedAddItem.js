function sortedAddItem(item) {
            if (!sortComparer) {
                throw new Error("[SlickGrid DataView] sortedAddItem() requires a sort comparer, use sort()");
            }
            insertItem(sortedIndex(item), item);
        }