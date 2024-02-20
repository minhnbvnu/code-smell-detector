function _cellDate(row, col) {
		return addDays(cloneDate(t.visStart), row*7 + col*dis+dit);
		// what about weekends in middle of week?
	}