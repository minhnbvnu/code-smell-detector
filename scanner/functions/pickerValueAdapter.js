function pickerValueAdapter(value) {
	    if (!value) {
	        return;
	    }
	    if (Array.isArray(value)) {
	        return value;
	    }
	    return [value, value.clone().add(1, 'month')];
	}