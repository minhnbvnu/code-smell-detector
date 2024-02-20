function reportSelection(startDate, endDate, allDay, ev) {
		selected = true;
		trigger('select', null, startDate, endDate, allDay, ev);
	}