function slotSelectionMousedown(ev) {
		if (ev.which == 1 && opt('selectable')) { // ev.which==1 means left mouse button
			unselect(ev);
			var dates;
			hoverListener.start(function(cell, origCell) {
				clearSelection();
				if (cell && cell.col == origCell.col && !cellIsAllDay(cell)) {
					var d1 = cellDate(origCell);
					var d2 = cellDate(cell);
					dates = [
						d1,
						addMinutes(cloneDate(d1), opt('slotMinutes')),
						d2,
						addMinutes(cloneDate(d2), opt('slotMinutes'))
					].sort(cmp);
					renderSlotSelection(dates[0], dates[3]);
				}else{
					dates = null;
				}
			}, ev);
			$(document).one('mouseup', function(ev) {
				hoverListener.stop();
				if (dates) {
					if (+dates[0] == +dates[1]) {
						reportDayClick(dates[0], false, ev);
					}
					reportSelection(dates[0], dates[3], false, ev);
				}
			});
		}
	}