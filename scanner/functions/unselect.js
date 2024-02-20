function unselect(ev) {
		if (selected) {
			selected = false;
			clearSelection();
			trigger('unselect', null, ev);
		}
	}