function syncGridSelection(grid, preserveHidden, preserveHiddenOnSelectionChange) {
            var self = this;
            _grid = grid;
            var inHandler;
            selectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
            var onSelectedRowIdsChanged = new Slick.Event();
            function setSelectedRowIds(rowIds) {
                if (selectedRowIds.join(",") == rowIds.join(",")) {
                    return;
                }
                selectedRowIds = rowIds;
                onSelectedRowIdsChanged.notify({
                    "grid": grid,
                    "ids": selectedRowIds,
                    "dataView": self
                }, new Slick.EventData(), self);
            }
            function update() {
                if (selectedRowIds.length > 0) {
                    inHandler = true;
                    var selectedRows = self.mapIdsToRows(selectedRowIds);
                    if (!preserveHidden) {
                        setSelectedRowIds(self.mapRowsToIds(selectedRows));
                    }
                    grid.setSelectedRows(selectedRows);
                    inHandler = false;
                }
            }
            grid.onSelectedRowsChanged.subscribe(function (e, args) {
                if (inHandler) {
                    return;
                }
                var newSelectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
                if (!preserveHiddenOnSelectionChange || !grid.getOptions().multiSelect) {
                    setSelectedRowIds(newSelectedRowIds);
                }
                else {
                    // keep the ones that are hidden
                    var existing = $.grep(selectedRowIds, function (id) { return self.getRowById(id) === undefined; });
                    // add the newly selected ones
                    setSelectedRowIds(existing.concat(newSelectedRowIds));
                }
            });
            this.onRowsOrCountChanged.subscribe(update);
            return onSelectedRowIdsChanged;
        }