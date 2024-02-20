function paintCellsByColumns(gc) {
    var grid = this.grid,
        gridProps = grid.properties,
        prefillColor, gridPrefillColor = gridProps.backgroundColor,
        cellEvent,
        columnBundle, columnBundles,
        visibleColumns = this.visibleColumns,
        visibleRows = this.visibleRows,
        c, C = visibleColumns.length, cLast = C - 1,
        r, R = visibleRows.length,
        pool = this.cellEventPool,
        preferredWidth,
        columnClip,
        // clipToGrid,
        viewWidth = C ? visibleColumns[cLast].right : 0,
        viewHeight = R ? visibleRows[R - 1].bottom : 0;


    gc.clearRect(0, 0, this.bounds.width, this.bounds.height);

    if (!C || !R) { return; }

    if (gc.alpha(gridPrefillColor) > 0) {
        gc.cache.fillStyle = gridPrefillColor;
        gc.fillRect(0, 0, viewWidth, viewHeight);
    }

    if (this.gridRenderer.reset) {
        this.resetAllGridRenderers(['by-columns-discrete']);
        this.gridRenderer.reset = false;
        bundleColumns.call(this, true);
    } else if (this.gridRenderer.rebundle) {
        this.gridRenderer.rebundle = false;
        bundleColumns.call(this);
    }

    for (columnBundles = this.columnBundles, c = columnBundles.length; c--;) {
        columnBundle = columnBundles[c];
        gc.clearFill(columnBundle.left, 0, columnBundle.right - columnBundle.left, viewHeight, columnBundle.backgroundColor);
    }

    // gc.clipSave(clipToGrid, 0, 0, viewWidth, viewHeight);

    // For each column...
    var p = 0;
    this.visibleColumns.forEachWithNeg(function(vc, c) {
        cellEvent = pool[p]; // first cell in column c
        vc = cellEvent.visibleColumn;

        prefillColor = cellEvent.column.properties.backgroundColor;

        // Optionally clip to visible portion of column to prevent text from overflowing to right.
        columnClip = vc.column.properties.columnClip;
        gc.clipSave(columnClip || columnClip === null && c === cLast, 0, 0, vc.right, viewHeight);

        // For each row of each subgrid (of each column)...
        for (preferredWidth = r = 0; r < R; r++, p++) {
            cellEvent = pool[p]; // next cell down the column (redundant for first cell in column)

            try {
                preferredWidth = Math.max(preferredWidth, this._paintCell(gc, cellEvent, prefillColor));
            } catch (e) {
                this.renderErrorCell(e, gc, vc, cellEvent.visibleRow);
            }
        }

        gc.clipRestore(columnClip);

        cellEvent.column.properties.preferredWidth = Math.round(preferredWidth);
    }, this);

    // gc.clipRestore(clipToGrid);

    this.paintGridlines(gc);
}