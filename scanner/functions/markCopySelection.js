function markCopySelection(ranges) {
            clearCopySelection();
            var columns = _grid.getColumns();
            var hash = {};
            for (var i = 0; i < ranges.length; i++) {
                for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
                    hash[j] = {};
                    for (var k = ranges[i].fromCell; k <= ranges[i].toCell && k < columns.length; k++) {
                        hash[j][columns[k].id] = _copiedCellStyle;
                    }
                }
            }
            _grid.setCellCssStyles(_copiedCellStyleLayerKey, hash);
            clearTimeout(_clearCopyTI);
            _clearCopyTI = setTimeout(function () {
                _self.clearCopySelection();
            }, 2000);
        }