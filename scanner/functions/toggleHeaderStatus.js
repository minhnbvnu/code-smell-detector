function toggleHeaderStatus(table, scope) {
		var	i,
			j,
			allHeaders = table.selection.isHeader(),
			domCell, // representation of the cell in the dom
			bufferCell; // temporary buffer

		for (i = 0; i < table.selection.selectedCells.length; i++) {
			domCell = table.selection.selectedCells[i];

			// tries to match the current cell with a cell-object in the table
			for (j = 0; j < table.cells.length; j++) {
				if (domCell === table.cells[j].obj[0]) {
					cell = table.cells[j];
					break;
				}
			}

			// the transformed dom objects are first stored in a buffer, and only applied to
			// the table-cell-object if a match was found
			if (allHeaders) {
				bufferCell = Aloha.Markup.transformDomObject(domCell, 'td').removeAttr('scope').get(0);
			} else {
				bufferCell = Aloha.Markup.transformDomObject(domCell, 'th').attr('scope', scope).get(0);
			}

			if (cell != null) {
				// assign the changed dom-element to the table-cell
				cell.obj[0] = bufferCell;

				// reactivate the table cell in order to bind events to the changed dom object
				// TODO: re-attaching event-handlers should be factored out into a utility function
				// so we don't have to do the whole activation/deactivation process for the cells
				cell.deactivate();
				cell.activate();
			}

			// uncommented code-segment, presumably added to force IE to target the wrapper
			// on mouse-down by applying a timeout after event propagation
			jQuery(table.selection.selectedCells[i]).bind('mousedown', function (jqEvent) {
				var wrapper = jQuery(this).children('div').eq(0);
				window.setTimeout(function () {
					wrapper.trigger( 'focus' );
				}, 1);
			});
		}
	}