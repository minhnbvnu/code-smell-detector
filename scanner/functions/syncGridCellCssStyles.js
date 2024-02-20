function syncGridCellCssStyles(grid, key) {
            var hashById;
            var inHandler;
            // since this method can be called after the cell styles have been set,
            // get the existing ones right away
            storeCellCssStyles(grid.getCellCssStyles(key));
            function storeCellCssStyles(hash) {
                hashById = {};
                for (var row in hash) {
                    var id = rows[row][idProperty];
                    hashById[id] = hash[row];
                }
            }
            function update() {
                if (hashById) {
                    inHandler = true;
                    ensureRowsByIdCache();
                    var newHash = {};
                    for (var id in hashById) {
                        var row = rowsById[id];
                        if (row != undefined) {
                            newHash[row] = hashById[id];
                        }
                    }
                    grid.setCellCssStyles(key, newHash);
                    inHandler = false;
                }
            }
            grid.onCellCssStylesChanged.subscribe(function (e, args) {
                if (inHandler) {
                    return;
                }
                if (key != args.key) {
                    return;
                }
                if (args.hash) {
                    storeCellCssStyles(args.hash);
                }
                else {
                    grid.onCellCssStylesChanged.unsubscribe();
                    self.onRowsOrCountChanged.unsubscribe(update);
                }
            });
            this.onRowsOrCountChanged.subscribe(update);
        }