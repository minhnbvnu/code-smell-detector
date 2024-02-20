function setCellStatus(row, cell, value, cellsByRow) {
				var rowCells = getCellsForRow(row, cellsByRow);
				if (!rowCells && !value) {
					return;
				}

				if (value) {
					if (!rowCells) {
						rowCells = {
							row: row,
							cells: []
						};
						cellsByRow.push(rowCells);
					}
					if (rowCells.cells.indexOf(cell) === -1) {
						rowCells.cells.push(cell);
					}
				} else {
					_.remove(rowCells.cells, function (item) {
						return cell === item;
					});
					if (rowCells.cells.length === 0) {
						_.remove(cellsByRow, function (item) {
							return rowCells === item;
						});
					}
				}
			}