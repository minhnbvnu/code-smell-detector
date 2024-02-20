function mapRowsToIds(rowArray) {
            var ids = [];
            for (var i = 0, l = rowArray.length; i < l; i++) {
                if (rowArray[i] < rows.length) {
                    ids[ids.length] = rows[rowArray[i]][idProperty];
                }
            }
            return ids;
        }