function setPropertiesValues(properties){
		if (typeof properties.size != "undefined") size = properties.size;
		if (typeof properties.label != "undefined") label = properties.label;
		if (typeof properties.labels != "undefined") labels = properties.labels;
		if (typeof properties.font != "undefined") font = properties.font;
		if (typeof properties.step != "undefined") step = properties.step;
		//if (typeof properties.disabled != "undefined") disabled = !!properties.disabled;
	}