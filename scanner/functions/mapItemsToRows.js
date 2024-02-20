function mapItemsToRows(itemArray) {
            var rows = [];
            ensureRowsByIdCache();
            for (var i = 0, l = itemArray.length; i < l; i++) {
                var row = rowsById[itemArray[i][idProperty]];
                if (row != null) {
                    rows[rows.length] = row;
                }
            }
            return rows;
        }