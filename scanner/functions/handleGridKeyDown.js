function handleGridKeyDown(e, args) {
            if (options.enableExpandCollapse && (e.which == Slick.keyCode.SPACE)) {
                var activeCell = this.getActiveCell();
                if (activeCell) {
                    var item = this.getDataItem(activeCell.row);
                    if (item && item instanceof Slick.Group) {
                        var range = _grid.getRenderedRange();
                        this.getData().setRefreshHints({
                            ignoreDiffsBefore: range.top,
                            ignoreDiffsAfter: range.bottom + 1
                        });
                        if (item.collapsed) {
                            this.getData().expandGroup(item.groupingKey);
                        }
                        else {
                            this.getData().collapseGroup(item.groupingKey);
                        }
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
            }
        }