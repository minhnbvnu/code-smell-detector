function storeCellCssStyles(hash) {
                hashById = {};
                for (var row in hash) {
                    var id = rows[row][idProperty];
                    hashById[id] = hash[row];
                }
            }