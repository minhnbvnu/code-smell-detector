function getCellsForRow(row, cellsByRow) {
				return _.find(cellsByRow, function (entry) {
					return entry.row === row;
				})
			}