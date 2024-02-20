function getRowByItem(item) {
            ensureRowsByIdCache();
            return rowsById[item[idProperty]];
        }