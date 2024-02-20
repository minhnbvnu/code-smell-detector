function isAllowedDate(value, disabledDate, disabledTime) {
	  if (disabledDate) {
	    if (disabledDate(value)) {
	      return false;
	    }
	  }
	  if (disabledTime) {
	    if (!isTimeValid(value, disabledTime)) {
	      return false;
	    }
	  }
	  return true;
	}