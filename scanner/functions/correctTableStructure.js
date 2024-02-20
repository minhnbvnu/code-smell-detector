function correctTableStructure ( tableObj ) {
		var table = tableObj.obj,

			i,
			j,
		    row,
		    rows = tableObj.getRows(),
		    rowsNum = rows.length,

			cols,
			colsNum,

		    colsCount,
		    maxColsCount = 0,
		    cachedColsCounts = [rowsNum],
		    colsCountDiff,
		    colSpan;

		for ( i = 0; i < rowsNum; i++ ) {
			row = jQuery( rows[ i ] );
			cols = row.children( 'td, th' );
			colsNum = cols.length;
			colsCount = Utils.cellIndexToGridColumn( rows, i, colsNum - 1 ) + 1;

			// Check if the last cell in this row has a col span, to account
			// for it in the total number of colums in this row

			colSpan = parseInt( cols.last().attr( 'colspan' ), 10 );

			if ( colSpan == 0 ) {
				// TODO: support colspan=0
				// http://dev.w3.org/html5/markup/td.html#td.attrs.colspan
				// http://www.w3.org/TR/html401/struct/tables.html#adef-colspan
				// The value zero ("0") means that the cell spans all columns
				// from the current column to the last column of the column
				// group (COLGROUP) in which the cel
			} else if ( !isNaN( colSpan ) ) {
				// The default value of this attribute is one ("1"), so where this
				// is the case, we will remove such superfluous colspan attributes
				if ( colSpan == 1 ) {
					cols.last().removeAttr( 'colspan' );
				}

				colsCount += ( colSpan - 1 );
			}

			// if a rowspan is set in the last element of the row, the row(s) below
			// are supposed to have one less column for every colspan the element has
			rowSpan = parseInt(cols.last().attr('rowspan'), 10);
			if (rowSpan > 1) {
				for (j = 1; j < rowSpan-1; j++) {
					if (colSpan > 1) {
						cachedColsCounts[i+j] += colSpan;
					} else {
						cachedColsCounts[i+j] += 1;
					}
				}
			}

			cachedColsCounts[i] += colsCount;

			if (cachedColsCounts[i] > maxColsCount) {
				maxColsCount = cachedColsCounts[i];
			}
		}

		for ( i = 0; i < rowsNum; i++ ) {
			colsCountDiff = maxColsCount - cachedColsCounts[ i ];
			if ( colsCountDiff > 0 ) {
				// Create as many td's as we need to complete the row
				jQuery( rows[ i ] ).append(
					( new Array( colsCountDiff + 1 ) ).join( '<td></td>' )
				);
			}
		}
	}