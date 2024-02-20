function mapIdsToRows(idArray) {
            var rows = [];
            ensureRowsByIdCache();
            for (var i = 0, l = idArray.length; i < l; i++) {
                var row = rowsById[idArray[i]];
                if (row != null) {
                    rows[rows.length] = row;
                }
            }
            return rows;
        }