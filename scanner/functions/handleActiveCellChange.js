function handleActiveCellChange(e, data) {
            if (_options.selectActiveRow && data.row != null) {
                setSelectedRanges([new Slick.Range(data.row, 0, data.row, _grid.getColumns().length - 1)]);
            }
        }