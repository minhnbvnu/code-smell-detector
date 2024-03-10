function computeCellsBounds() {
    var scrollTop = this.getScrollTop(),
        scrollLeft = this.getScrollLeft(),

        bounds = this.getBounds(),
        grid = this.grid,
        behavior = grid.behavior,
        hasTreeColumn = behavior.hasTreeColumn(),
        treeColumnIndex = behavior.treeColumnIndex,

        editorCellEvent = grid.cellEditor && grid.cellEditor.event,

        vcEd, xEd,
        vrEd, yEd,
        sgEd, isSubgridEd,

        insertionBoundsCursor = 0,
        previousInsertionBoundsCursorValue = 0,

        gridProps = grid.properties,
        borderBox = gridProps.boxSizing === 'border-box',

        lineWidthV = gridProps.gridLinesVWidth,
        lineGapV = borderBox ? 0 : lineWidthV,

        lineWidthH = gridProps.gridLinesHWidth,
        lineGapH = borderBox ? 0 : lineWidthH,

        fixedColumnCount = this.grid.getFixedColumnCount(),
        fixedRowCount = this.grid.getFixedRowCount(),

        start = behavior.leftMostColIndex,
        numOfInternalCols = 0,
        x, X, // horizontal pixel loop index and limit
        y, Y, // vertical pixel loop index and limit
        c, C, // column loop index and limit
        g, G, // subgrid loop index and limit
        r, R, // row loop index and limit
        subrows, // rows in subgrid g
        base, // sum of rows for all subgrids so far
        fixedColumnIndex = -3,
        fixedRowIndex = -1,
        fixedWidthV, fixedGapV, fixedOverlapV,
        fixedWidthH, fixedGapH, fixedOverlapH,
        subgrids = behavior.subgrids,
        subgrid,
        rowIndex,
        scrollableSubgrid,
        footerHeight,
        vx, vy,
        vr, vc,
        width, height,
        firstVX, lastVX,
        firstVY, lastVY,
        topR,
        gap;

    if (editorCellEvent) {
        xEd = editorCellEvent.gridCell.x;
        yEd = editorCellEvent.dataCell.y;
        sgEd = editorCellEvent.subgrid;
    }

    if (gridProps.showRowNumbers) {
        fixedColumnIndex = hasTreeColumn ? treeColumnIndex : 0;
        numOfInternalCols += 1;
    }

    if (hasTreeColumn) {
        fixedColumnIndex = 0;
        numOfInternalCols += 1;
    }

    if (fixedColumnCount) {
        fixedColumnIndex = fixedColumnCount;
    }

    if (fixedRowCount) {
        fixedRowIndex = fixedRowCount;
    }

    if (gridProps.fixedLinesVWidth === undefined) {
        fixedColumnIndex = -3; // left of any column
    } else {
        fixedWidthV = Math.max(gridProps.fixedLinesVWidth || lineWidthV, lineWidthV);
        fixedGapV = borderBox ? fixedWidthV - lineWidthV : fixedWidthV;
        fixedOverlapV = fixedGapV - fixedWidthV;
    }

    if (gridProps.fixedLinesHWidth === undefined) {
        fixedRowIndex = -1; // above any row
    } else {
        fixedWidthH = Math.max(gridProps.fixedLinesHWidth || lineWidthH, lineWidthH);
        fixedGapH = borderBox ? fixedWidthH - lineWidthH : fixedWidthH;
        fixedOverlapH = fixedGapH - fixedWidthH;
    }

    this.scrollHeight = 0;

    this.visibleColumns.length = 0;
    this.visibleColumns.gap = this.visibleColumns[-1] = this.visibleColumns[-2] = undefined;

    this.visibleRows.length = 0;
    this.visibleRows.gap = undefined;

    this.visibleColumnsByIndex = []; // array because number of columns will always be reasonable
    this.visibleRowsByDataRowIndex = {}; // hash because keyed by (fixed and) scrolled row indexes

    this.insertionBounds = [];

    for (
        x = 0, c = start, C = grid.getColumnCount(), X = bounds.width || grid.canvas.width;
        c < C && x <= X;
        c++
    ) {
        if (!hasTreeColumn && c === treeColumnIndex) {
            this.visibleColumns[c] = undefined;
            continue;
        }

        if ((gap = c === fixedColumnIndex)) {
            this.visibleColumns.gap = {
                left: vc.right + fixedOverlapV,
                right: undefined
            };
            x += fixedGapV;
        } else if (x) {
            x += lineGapV;
        }

        vx = c;
        if (c >= fixedColumnCount) {
            lastVX = vx += scrollLeft;
            if (firstVX === undefined) {
                firstVX = lastVX;
            }
        }
        if (vx >= C) {
            break; // scrolled beyond last column
        }

        width = Math.ceil(behavior.getColumnWidth(vx));

        this.visibleColumns[c] = this.visibleColumnsByIndex[vx] = vc = {
            index: c,
            columnIndex: vx,
            column: behavior.getActiveColumn(vx),
            left: x,
            width: width,
            right: x + width
        };

        if (gap) {
            this.visibleColumns.gap.right = vc.left;
        }

        if (xEd === vx) {
            vcEd = vc;
        }

        x += width;

        insertionBoundsCursor += Math.round(width / 2) + previousInsertionBoundsCursorValue;
        this.insertionBounds.push(insertionBoundsCursor);
        previousInsertionBoundsCursorValue = Math.round(width / 2);
    }

    // get height of total number of rows in all subgrids following the data subgrid
    footerHeight = gridProps.defaultRowHeight * behavior.getFooterRowCount();

    for (
        base = r = g = y = 0, G = subgrids.length, Y = bounds.height - footerHeight;
        g < G;
        g++, base += subrows
    ) {
        subgrid = subgrids[g];
        subrows = subgrid.getRowCount();
        scrollableSubgrid = subgrid.isData;
        isSubgridEd = (sgEd === subgrid);
        topR = r;

        // For each row of each subgrid...
        for (R = r + subrows; r < R && y < Y; r++) {
            if ((gap = scrollableSubgrid && r === fixedRowIndex)) {
                this.visibleRows.gap = {
                    top: vr.bottom + fixedOverlapH,
                    bottom: undefined
                };
                y += fixedGapH;
            } else if (y) {
                y += lineGapH;
            }


            vy = r;
            if (scrollableSubgrid && r >= fixedRowCount) {
                vy += scrollTop;
                lastVY = vy - base;
                if (firstVY === undefined) {
                    firstVY = lastVY;
                }
                if (vy >= R) {
                    break; // scrolled beyond last row
                }
            }

            rowIndex = vy - base;
            height = behavior.getRowHeight(rowIndex, subgrid);

            this.visibleRows[r] = vr = {
                index: r,
                subgrid: subgrid,
                rowIndex: rowIndex,
                top: y,
                height: height,
                bottom: y + height
            };

            if (gap) {
                this.visibleRows.gap.bottom = vr.top;
            }

            if (scrollableSubgrid) {
                this.visibleRowsByDataRowIndex[vy - base] = vr;
            }

            if (isSubgridEd && yEd === rowIndex) {
                vrEd = vr;
            }

            y += height;
        }

        if (scrollableSubgrid) {
            subrows = r - topR;
        }
    }

    if (editorCellEvent) {
        editorCellEvent.visibleColumn = vcEd;
        editorCellEvent.visibleRow = vrEd;
        editorCellEvent.gridCell.y = vrEd && vrEd.index;
        editorCellEvent._bounds = null;
    }

    this.dataWindow = new InclusiveRectangle(
        firstVX,
        firstVY,
        Math.min(lastVX - firstVX + 1, this.visibleColumns.length),
        Math.min(lastVY - firstVY + 1, this.visibleRows.length)
    );

    // Resize CellEvent pool
    var pool = this.cellEventPool,
        previousLength = pool.length,
        P = (this.visibleColumns.length + numOfInternalCols) * this.visibleRows.length;

    if (P > previousLength) {
        pool.length = P; // grow pool to accommodate more cells
    }
    for (var p = previousLength; p < P; p++) {
        pool[p] = new behavior.CellEvent; // instantiate new members
    }

    this.resetAllGridRenderers();
}