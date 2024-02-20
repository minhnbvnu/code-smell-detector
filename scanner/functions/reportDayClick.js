function reportDayClick(date, allDay, ev) {
		trigger('dayClick', dayBodyCells[dayOfWeekCol(date.getDay())], date, allDay, ev);
	}