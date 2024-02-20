function appendGroup(group) {
		groupPosition += 1;
		group.properties.forEach((item) => appendItem(item, false, group));
	}