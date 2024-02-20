function afterCurrentMonthYear(current, today) {
	  if (current.year() > today.year()) {
	    return 1;
	  }
	  return current.year() === today.year() && current.month() > today.month();
	}