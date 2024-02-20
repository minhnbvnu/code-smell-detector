function isSelectOptionOrSelectOptGroup(child) {
	    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
	}