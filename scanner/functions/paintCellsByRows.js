function paintCellsByRows(gc) {
    var grid = this.grid,
        gridProps = grid.properties,
        prefillColor, rowPrefillColors, gridPrefillColor = gridProps.backgroundColor,
        cellEvent,
        rowBundle, rowBundles = this.rowBundles,
        visibleColumns = this.visibleColumns,
        vr, visibleRows = this.visibleRows,
        c, C = visibleColumns.length, c0 = 0, cLast = C - 1,
        r, R = visibleRows.length,
        p, pool = this.cellEventPool,
        preferredWidth = Array(C - c0).fill(0),
        columnClip,
        // clipToGrid,
        viewWidth = C ? visibleColumns[C - 1].right : 0,
        viewHeight = R ? visibleRows[R - 1].bottom : 0,
        drawLines = gridProps.gridLinesH,
        lineWidth = gridProps.gridLinesHWidth,
        lineColor = gridProps.gridLinesHColor;

    gc.clearRect(0, 0, this.bounds.width, this.bounds.height);

    if (!C || !R) { return; }

    if (gc.alpha(gridPrefillColor) > 0) {
        gc.cache.fillStyle = gridPrefillColor;
        gc.fillRect(0, 0, viewWidth, viewHeight);
    }

    if (this.gridRenderer.reset) {
        this.resetAllGridRenderers();
        this.gridRenderer.reset = false;
        bundleRows.call(this, true);
    }

    rowPrefillColors = this.rowPrefillColors;

    for (r = rowBundles.length; r--;) {
        rowBundle = rowBundles[r];
        gc.clearFill(0, rowBundle.top, viewWidth, rowBundle.bottom - rowBundle.top, rowBundle.backgroundColor);
    }

    // gc.clipSave(clipToGrid, 0, 0, viewWidth, viewHeight);

    // For each row of each subgrid...
    for (p = 0, r = 0; r < R; r++) {
        prefillColor = rowPrefillColors[r];

        if (drawLines) {
            gc.cache.fillStyle = lineColor;
            gc.fillRect(0, pool[p].visibleRow.bottom, viewWidth, lineWidth);
        }

        // For each column (of each row)...
        this.visibleColumns.forEachWithNeg(function(vc) {  // eslint-disable-line no-loop-func
            p++;
            cellEvent = pool[p]; // next cell across the row (redundant for first cell in row)
            vc = cellEvent.visibleColumn;

            // Optionally clip to visible portion of column to prevent text from overflowing to right.
            columnClip = vc.column.properties.columnClip;
            gc.clipSave(columnClip || columnClip === null && c === cLast, 0, 0, vc.right, viewHeight);

            try {
                preferredWidth[c] = Math.max(preferredWidth[c], this._paintCell(gc, cellEvent, prefillColor));
            } catch (e) {
                this.renderErrorCell(e, gc, vc, vr);
            }

            gc.clipRestore(columnClip);
        }, this);
    }

    // gc.clipRestore(clipToGrid);

    this.paintGridlines(gc);

    this.visibleColumns.forEachWithNeg(function(vc, c) {
        vc.column.properties.preferredWidth = Math.round(preferredWidth[c]);
    });
}