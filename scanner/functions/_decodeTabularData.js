function _decodeTabularData(_grid, ta) {
            var columns = _grid.getColumns();
            var clipText = ta.value;
            var clipRows = clipText.split(/[\n\f\r]/);
            // trim trailing CR if present
            if (clipRows[clipRows.length - 1] === "") {
                clipRows.pop();
            }
            var clippedRange = [];
            var j = 0;
            _bodyElement.removeChild(ta);
            for (var i = 0; i < clipRows.length; i++) {
                if (clipRows[i] !== "")
                    clippedRange[j++] = clipRows[i].split("\t");
                else
                    clippedRange[j++] = [""];
            }
            var selectedCell = _grid.getActiveCell();
            var ranges = _grid.getSelectionModel().getSelectedRanges();
            var selectedRange = ranges && ranges.length ? ranges[0] : null; // pick only one selection
            var activeRow = null;
            var activeCell = null;
            if (selectedRange) {
                activeRow = selectedRange.fromRow;
                activeCell = selectedRange.fromCell;
            }
            else if (selectedCell) {
                activeRow = selectedCell.row;
                activeCell = selectedCell.cell;
            }
            else {
                // we don't know where to paste
                return;
            }
            var oneCellToMultiple = false;
            var destH = clippedRange.length;
            var destW = clippedRange.length ? clippedRange[0].length : 0;
            if (clippedRange.length == 1 && clippedRange[0].length == 1 && selectedRange) {
                oneCellToMultiple = true;
                destH = selectedRange.toRow - selectedRange.fromRow + 1;
                destW = selectedRange.toCell - selectedRange.fromCell + 1;
            }
            var availableRows = _grid.getData().length - activeRow;
            var addRows = 0;
            // ignore new rows if we don't have a "newRowCreator"
            if (availableRows < destH && _options.newRowCreator) {
                var d = _grid.getData();
                for (addRows = 1; addRows <= destH - availableRows; addRows++)
                    d.push({});
                _grid.setData(d);
                _grid.render();
            }
            var overflowsBottomOfGrid = activeRow + destH > _grid.getDataLength();
            if (_options.newRowCreator && overflowsBottomOfGrid) {
                var newRowsNeeded = activeRow + destH - _grid.getDataLength();
                _options.newRowCreator(newRowsNeeded);
            }
            var clipCommand = {
                isClipboardCommand: true,
                clippedRange: clippedRange,
                oldValues: [],
                cellExternalCopyManager: _self,
                _options: _options,
                setDataItemValueForColumn: setDataItemValueForColumn,
                markCopySelection: markCopySelection,
                oneCellToMultiple: oneCellToMultiple,
                activeRow: activeRow,
                activeCell: activeCell,
                destH: destH,
                destW: destW,
                maxDestY: _grid.getDataLength(),
                maxDestX: _grid.getColumns().length,
                h: 0,
                w: 0,
                execute: function () {
                    this.h = 0;
                    for (var y = 0; y < this.destH; y++) {
                        this.oldValues[y] = [];
                        this.w = 0;
                        this.h++;
                        for (var x = 0; x < this.destW; x++) {
                            this.w++;
                            var desty = activeRow + y;
                            var destx = activeCell + x;
                            if (desty < this.maxDestY && destx < this.maxDestX) {
                                var nd = _grid.getCellNode(desty, destx);
                                var dt = _grid.getDataItem(desty);
                                this.oldValues[y][x] = dt[columns[destx]['field']];
                                if (oneCellToMultiple)
                                    this.setDataItemValueForColumn(dt, columns[destx], clippedRange[0][0]);
                                else
                                    this.setDataItemValueForColumn(dt, columns[destx], clippedRange[y] ? clippedRange[y][x] : '');
                                _grid.updateCell(desty, destx);
                                _grid.onCellChange.notify({
                                    row: desty,
                                    cell: destx,
                                    item: dt,
                                    grid: _grid
                                });
                            }
                        }
                    }
                    var bRange = {
                        'fromCell': activeCell,
                        'fromRow': activeRow,
                        'toCell': activeCell + this.w - 1,
                        'toRow': activeRow + this.h - 1
                    };
                    this.markCopySelection([bRange]);
                    _grid.getSelectionModel().setSelectedRanges([bRange]);
                    this.cellExternalCopyManager.onPasteCells.notify({ ranges: [bRange] });
                },
                undo: function () {
                    for (var y = 0; y < this.destH; y++) {
                        for (var x = 0; x < this.destW; x++) {
                            var desty = activeRow + y;
                            var destx = activeCell + x;
                            if (desty < this.maxDestY && destx < this.maxDestX) {
                                var nd = _grid.getCellNode(desty, destx);
                                var dt = _grid.getDataItem(desty);
                                if (oneCellToMultiple)
                                    this.setDataItemValueForColumn(dt, columns[destx], this.oldValues[0][0]);
                                else
                                    this.setDataItemValueForColumn(dt, columns[destx], this.oldValues[y][x]);
                                _grid.updateCell(desty, destx);
                                _grid.onCellChange.notify({
                                    row: desty,
                                    cell: destx,
                                    item: dt,
                                    grid: _grid
                                });
                            }
                        }
                    }
                    var bRange = {
                        'fromCell': activeCell,
                        'fromRow': activeRow,
                        'toCell': activeCell + this.w - 1,
                        'toRow': activeRow + this.h - 1
                    };
                    this.markCopySelection([bRange]);
                    _grid.getSelectionModel().setSelectedRanges([bRange]);
                    this.cellExternalCopyManager.onPasteCells.notify({ ranges: [bRange] });
                    if (addRows > 1) {
                        var d = _grid.getData();
                        for (; addRows > 1; addRows--)
                            d.splice(d.length - 1, 1);
                        _grid.setData(d);
                        _grid.render();
                    }
                }
            };
            if (_options.clipboardCommandHandler) {
                _options.clipboardCommandHandler(clipCommand);
            }
            else {
                clipCommand.execute();
            }
        }