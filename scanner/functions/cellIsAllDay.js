function cellIsAllDay(cell) {
		return opt('allDaySlot') && !cell.row;
	}