function getSelectedTableCells(node, elements) {
		var cellElement = getParentCellElement(node);
		var table;

		table = getTable(cellElement);

		if (hasCellSelection(table)) {
			return getCellsInSelection(table);
		}

		if (Arrays.isEmpty(elements)) {
			// If there is nothing selected, we add the cell.
			return [cellElement];
		}

		return elements;
	}