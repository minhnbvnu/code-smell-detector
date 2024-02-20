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