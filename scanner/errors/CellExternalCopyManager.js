        function handleKeyDown(e, args) {
            var ranges;
            if (!_grid.getEditorLock().isActive() || _grid.getOptions().autoEdit) {
                if (e.which == keyCodes.ESC) {
                    if (_copiedRanges) {
                        e.preventDefault();
                        clearCopySelection();
                        _self.onCopyCancelled.notify({ ranges: _copiedRanges });
                        _copiedRanges = null;
                    }
                }
                if ((e.which === keyCodes.C || e.which === keyCodes.INSERT) && (e.ctrlKey || e.metaKey) && !e.shiftKey) { // CTRL+C or CTRL+INS
                    if (_onCopyInit) {
                        _onCopyInit.call();
                    }
                    ranges = _grid.getSelectionModel().getSelectedRanges();
                    if (ranges.length !== 0) {
                        _copiedRanges = ranges;
                        markCopySelection(ranges);
                        _self.onCopyCells.notify({ ranges: ranges });
                        var columns = _grid.getColumns();
                        var clipText = "";
                        for (var rg = 0; rg < ranges.length; rg++) {
                            var range = ranges[rg];
                            var clipTextRows = [];
                            for (var i = range.fromRow; i < range.toRow + 1; i++) {
                                var clipTextCells = [];
                                var dt = _grid.getDataItem(i);
                                if (clipTextRows.length === 0 && _options.includeHeaderWhenCopying) {
                                    var clipTextHeaders = [];
                                    for (var j = range.fromCell; j < range.toCell + 1; j++) {
                                        if (columns[j].name.length > 0)
                                            clipTextHeaders.push(getHeaderValueForColumn(columns[j]));
                                    }
                                    clipTextRows.push(clipTextHeaders.join("\t"));
                                }
                                for (var j = range.fromCell; j < range.toCell + 1; j++) {
                                    clipTextCells.push(getDataItemValueForColumn(dt, columns[j], e));
                                }
                                clipTextRows.push(clipTextCells.join("\t"));
                            }
                            clipText += clipTextRows.join("\r\n") + "\r\n";
                        }
                        if (window.clipboardData) {
                            window.clipboardData.setData("Text", clipText);
                            return true;
                        }
                        else {
                            var focusEl = document.activeElement;
                            var ta = _createTextBox(clipText);
                            ta.focus();
                            setTimeout(function () {
                                _bodyElement.removeChild(ta);
                                // restore focus
                                if (focusEl)
                                    focusEl.focus();
                                else
                                    console.log("Not element to restore focus to after copy?");
                            }, 100);
                            if (_onCopySuccess) {
                                var rowCount = 0;
                                // If it's cell selection, use the toRow/fromRow fields
                                if (ranges.length === 1) {
                                    rowCount = (ranges[0].toRow + 1) - ranges[0].fromRow;
                                }
                                else {
                                    rowCount = ranges.length;
                                }
                                _onCopySuccess.call(this, rowCount);
                            }
                            return false;
                        }
                    }
                }
                if (!_options.readOnlyMode && ((e.which === keyCodes.V && (e.ctrlKey || e.metaKey) && !e.shiftKey)
                    || (e.which === keyCodes.INSERT && e.shiftKey && !e.ctrlKey))) { // CTRL+V or Shift+INS
                    var ta = _createTextBox('');
                    setTimeout(function () {
                        _decodeTabularData(_grid, ta);
                    }, 100);
                    return false;
                }
            }
        }