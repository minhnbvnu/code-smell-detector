function getRowById(id) {
            ensureRowsByIdCache();
            return rowsById[id];
        }