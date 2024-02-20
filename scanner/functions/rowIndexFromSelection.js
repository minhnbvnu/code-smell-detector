function rowIndexFromSelection( position, selection ) {

		var newRowIndex = -1;

		// get the index where the new rows should be inserted
		var cellOfInterest = null;
		if ( 'before' === position ) {
			cellOfInterest = selection.selectedCells[ 0 ];
		} else if ( 'after' === position ) {
			var offset = selection.selectedCells.length - 1;
			cellOfInterest = selection.selectedCells[ offset ];
		}

		if (cellOfInterest && cellOfInterest.nodeType == 1) {
			newRowIndex = cellOfInterest.parentNode.rowIndex;
		}

		return newRowIndex;
	}