function defaultSelectionEnd(startDate, allDay) {
		if (allDay) {
			return cloneDate(startDate);
		}
		return addMinutes(cloneDate(startDate), opt('slotMinutes'));
	}